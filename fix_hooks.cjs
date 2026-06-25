const fs = require('fs');
const path = require('path');

function processFile(fullPath) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Quick check if the file even has isLoading and useState/useMemo/useCallback
    if (!content.includes('usePageLoading()')) return;
    if (!content.includes('useState') && !content.includes('useMemo') && !content.includes('useCallback')) return;

    const lines = content.split('\n');
    let isLoadingStart = -1;
    let isLoadingEnd = -1;
    
    // Find where the `if (isLoading)` block starts
    for (let i = 0; i < lines.length; i++) {
        // match `if (isLoading) {` with possible whitespaces
        if (lines[i].match(/^\s*if\s*\(isLoading\)\s*\{\s*$/) || lines[i].match(/^\s*if\s*\(isLoading\)\s*return\s*\(/)) {
            isLoadingStart = i;
            let openBraces = 0;
            let openParens = 0;
            
            for (let j = i; j < lines.length; j++) {
                openBraces += (lines[j].match(/\{/g) || []).length;
                openBraces -= (lines[j].match(/\}/g) || []).length;
                openParens += (lines[j].match(/\(/g) || []).length;
                openParens -= (lines[j].match(/\)/g) || []).length;
                
                // if it's single line `if (isLoading) return (...)`
                if (lines[i].includes('return (') && !lines[i].includes('{')) {
                    if (openParens === 0 && openBraces === 0 && j > i) {
                        // check if it ends with `;`
                        isLoadingEnd = j;
                        break;
                    }
                } else {
                    if (openBraces === 0) {
                        isLoadingEnd = j;
                        break;
                    }
                }
            }
            break;
        }
    }
    
    if (isLoadingStart !== -1 && isLoadingEnd !== -1) {
        // Ensure there's a hook declared after the block.
        // If the first hook is declared before `isLoadingStart`, we still move it down to be safe,
        // but we mainly care if there are hooks AFTER the block.
        let hasHookAfter = false;
        for (let i = isLoadingEnd + 1; i < lines.length; i++) {
            if (lines[i].match(/^\s*const\s+\[.*\]\s*=\s*useState/)) hasHookAfter = true;
            if (lines[i].match(/^\s*const\s+.*\s*=\s*useMemo/)) hasHookAfter = true;
            if (lines[i].match(/^\s*const\s+.*\s*=\s*useCallback/)) hasHookAfter = true;
        }
        
        if (!hasHookAfter) {
            return; // No fix needed
        }

        const block = lines.slice(isLoadingStart, isLoadingEnd + 1).join('\n');
        
        // Find the main return. It's usually `  return (` or `  return <` at the top level of the component.
        // It should be the first `  return\s*(` or `  return\s*<` after isLoadingEnd, at indentation of 2 spaces.
        let mainReturnIdx = -1;
        for (let i = isLoadingEnd + 1; i < lines.length; i++) {
            if (lines[i].match(/^  return\s*\(/) || lines[i].match(/^  return\s*</) || lines[i].match(/^  return\s*<Page/) || lines[i].match(/^  return \(/)) {
                mainReturnIdx = i;
                break;
            }
        }
        
        if (mainReturnIdx !== -1) {
            // Remove the block
            lines.splice(isLoadingStart, isLoadingEnd - isLoadingStart + 1);
            
            // Adjust mainReturnIdx because we removed lines
            mainReturnIdx -= (isLoadingEnd - isLoadingStart + 1);
            
            // Insert the block right before main return
            // Wait, we need an empty line before and after for formatting.
            lines.splice(mainReturnIdx, 0, block + '\n');
            
            fs.writeFileSync(fullPath, lines.join('\n'));
            console.log("Fixed", fullPath);
        } else {
            console.log("Could not find main return for", fullPath);
        }
    }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

processDir(path.join(__dirname, 'src/app/pages'));
