/**
 * Injects skeleton loading states into all dashboard pages.
 * Run with: node scripts/inject-skeletons.mjs
 */
import fs from 'fs';
import path from 'path';

const PAGES_DIR = path.resolve('src/app/pages');

// Page definitions: [filePath, { title, crumbs?, chips?, kpis, kpiCols?, charts?, tables?, pieCharts?, heatTables?, panels?, customSkeleton? }]
const pages = [
  // === Engagement Sub-Pages ===
  ['engagement/TotalActivePatients.tsx', { fn: 'TotalActivePatients', title: 'Total Active Patients (Selected Duration)', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 1, charts: 1, tables: 1, depth: 2 }],
  ['engagement/Encounters.tsx', { fn: 'Encounters', title: 'Total # Encounters', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 2, kpiCols: 2, charts: 1, tables: 1, depth: 2 }],
  ['engagement/EncounterTypesBreakdown.tsx', { fn: 'EncounterTypesBreakdown', title: 'Encounter Types - Breakdown', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 1, charts: 1, tables: 1, depth: 2 }],
  ['engagement/CareEpisodesBreakdown.tsx', { fn: 'CareEpisodesBreakdown', title: 'Care Episodes - Breakdown', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 1, charts: 1, tables: 1, depth: 2 }],
  ['engagement/TotalAfterHoursEncounters.tsx', { fn: 'TotalAfterHoursEncounters', title: 'Total # After Hours Encounters', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 1, charts: 1, depth: 2 }],
  ['engagement/PatientTouchRatio.tsx', { fn: 'PatientTouchRatio', title: 'Patient Touch Ratio', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 1, charts: 1, tables: 1, depth: 2 }],
  ['engagement/PrescriptionOrders.tsx', { fn: 'PrescriptionOrders', title: 'Prescription Orders', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 2, kpiCols: 2, charts: 1, tables: 1, depth: 2 }],
  ['engagement/PrescriptionBreakdown.tsx', { fn: 'PrescriptionBreakdown', title: 'Prescription Orders - Breakdown', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 1, charts: 1, tables: 1, depth: 2 }],
  ['engagement/TotalActiveManifestMembers.tsx', { fn: 'TotalActiveManifestMembers', title: 'Total # Active Manifest Members', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 1, charts: 1, tables: 1, depth: 2 }],
  ['engagement/TotalAfterHoursPrescriptions.tsx', { fn: 'TotalAfterHoursPrescriptions', title: 'Total # After Hours Prescriptions', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 2, kpiCols: 2, charts: 1, depth: 2 }],
  ['engagement/TotalMessages.tsx', { fn: 'TotalMessages', title: 'Total # Messages', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 1, charts: 1, tables: 1, depth: 2 }],
  ['engagement/MessageTypesBreakdown.tsx', { fn: 'MessageTypesBreakdown', title: 'Message Types - Breakdown', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 1, charts: 1, depth: 2 }],
  ['engagement/TotalAfterHoursMessages.tsx', { fn: 'TotalAfterHoursMessages', title: 'Total # After Hours Messages', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 1, charts: 1, depth: 2 }],
  ['engagement/DigitalEngagement.tsx', { fn: 'DigitalEngagement', title: 'Digital Engagement', crumbs: '[{ label: "Engagement and Utilization", to: "/engagement" }]', chips: 'baseChips', kpis: 1, charts: 1, tables: 1, depth: 2 }],

  // === Top-Level Pages ===
  ['ClaimsUtilization.tsx', { fn: 'ClaimsUtilization', title: 'Claims Utilization', chips: 'claimsChips', kpis: 5, kpiCols: 3, charts: 1, depth: 1 }],
  ['ClaimsBillingReport.tsx', { fn: 'ClaimsBillingReport', title: 'Claims Billing Report', chips: 'chips', kpis: 0, tables: 1, depth: 1 }],
  ['UtilizationGaps.tsx', { fn: 'UtilizationGaps', title: 'Utilization Gaps', chips: 'utilizationGapsChips', kpis: 1, tables: 1, depth: 1 }],
  ['ChronicRisk.tsx', { fn: 'ChronicRisk', title: 'Calculate Chronic Risk By', chips: 'chips', kpis: 1, panels: 2, panelCols: 2, depth: 1 }],
  ['CostSavings.tsx', { fn: 'CostSavings', title: 'Cost Savings', chips: 'costSavingsChips', kpis: 1, charts: 2, pieCharts: 1, tables: 1, depth: 1 }],
  ['Communication.tsx', { fn: 'Communication', title: 'Communication', chips: '[]', panels: 2, panelCols: 2, heatTables: 3, depth: 1 }],
  ['Marketing.tsx', { fn: 'Marketing', title: 'Marketing', chips: '[]', kpis: 4, kpiCols: 4, tables: 1, depth: 1 }],
  ['Survey.tsx', { fn: 'Survey', title: 'Survey Type', chips: 'surveyChips', kpis: 4, kpiCols: 4, panels: 2, panelCols: 2, tables: 1, depth: 1 }],
  ['CoordinatedCare.tsx', { fn: 'CoordinatedCare', title: 'Coordinated Care', chips: 'coordinatedCareChips', kpis: 5, kpiCols: 5, panels: 2, panelCols: 2, depth: 1 }],

  // === ACO Pages ===
  ['aco/AcoOverview.tsx', { fn: 'AcoOverview', title: 'Dashboard / Overview', crumbs: '[{ label: "ACO Insights" }]', chips: 'acoChips', kpis: 7, kpiCols: 4, charts: 2, tables: 1, depth: 2 }],
  ['aco/AcoJourney.tsx', { fn: 'AcoJourney', title: 'Patient Journey', crumbs: '[{ label: "ACO Insights" }]', chips: 'acoChips', kpis: 3, charts: 1, depth: 2 }],
  ['aco/AcoProviderPerformance.tsx', { fn: 'AcoProviderPerformance', title: 'Provider Performance', crumbs: '[{ label: "ACO Insights" }]', chips: 'acoChips', kpis: 4, kpiCols: 4, tables: 1, depth: 2 }],
  ['aco/AcoGapsTracker.tsx', { fn: 'AcoGapsTracker', title: 'Gaps Tracker', crumbs: '[{ label: "ACO Insights" }]', chips: 'acoChips', kpis: 3, tables: 1, depth: 2 }],
  ['aco/AcoUtilization.tsx', { fn: 'AcoUtilization', title: 'Utilization', crumbs: '[{ label: "ACO Insights" }]', chips: 'acoChips', kpis: 4, kpiCols: 4, charts: 1, depth: 2 }],
  ['aco/AcoReports.tsx', { fn: 'AcoReports', title: 'Reports', crumbs: '[{ label: "ACO Insights" }]', chips: 'acoChips', kpis: 2, tables: 1, depth: 2 }],

  // === HCC Pages ===
  ['hcc/Overview.tsx', { fn: 'HccOverview', title: 'HCC Overview', crumbs: '[{ label: "HCC Insights" }]', chips: 'hccChips', kpis: 8, kpiCols: 4, charts: 1, pieCharts: 1, depth: 2 }],
  ['hcc/PatientList.tsx', { fn: 'HccPatientList', title: 'Patient List', crumbs: '[{ label: "HCC Insights" }]', chips: 'hccChips', kpis: 0, tables: 1, depth: 2 }],
  ['hcc/PreVisitPlan.tsx', { fn: 'HccPreVisitPlan', title: 'Pre-Visit Plan', crumbs: '[{ label: "HCC Insights" }]', chips: 'hccChips', kpis: 2, panels: 1, depth: 2 }],
  ['hcc/CodingQueue.tsx', { fn: 'HccCodingQueue', title: 'Coding Queue', crumbs: '[{ label: "HCC Insights" }]', chips: 'hccChips', kpis: 3, tables: 1, depth: 2 }],
  ['hcc/BulkAudit.tsx', { fn: 'HccBulkAudit', title: 'Bulk Audit', crumbs: '[{ label: "HCC Insights" }]', chips: 'hccChips', kpis: 4, kpiCols: 4, tables: 1, depth: 2 }],

  // === Outcomes Pages ===
  ['outcomes/DashboardOverview.tsx', { fn: 'DashboardOverview', title: 'Dashboard', crumbs: '[{ label: "Patient Outcomes" }]', chips: 'outcomesChips', kpis: 6, kpiCols: 3, pieCharts: 1, depth: 2 }],
  ['outcomes/PatientGroups.tsx', { fn: 'PatientGroups', title: 'Patient Groups', crumbs: '[{ label: "Patient Outcomes" }]', chips: 'outcomesChips', kpis: 3, tables: 1, depth: 2 }],
  ['outcomes/ScreeningsDue.tsx', { fn: 'ScreeningsDue', title: 'Screenings Due', crumbs: '[{ label: "Patient Outcomes" }]', chips: 'outcomesChips', kpis: 4, kpiCols: 4, tables: 1, depth: 2 }],
  ['outcomes/Vaccinations.tsx', { fn: 'Vaccinations', title: 'Vaccinations', crumbs: '[{ label: "Patient Outcomes" }]', chips: 'outcomesChips', kpis: 3, tables: 1, depth: 2 }],
  ['outcomes/Appointments.tsx', { fn: 'Appointments', title: 'Appointments', crumbs: '[{ label: "Patient Outcomes" }]', chips: 'outcomesChips', kpis: 3, tables: 1, depth: 2 }],
  ['outcomes/LabTrends.tsx', { fn: 'LabTrends', title: 'Lab Trends', crumbs: '[{ label: "Patient Outcomes" }]', chips: 'outcomesChips', kpis: 2, charts: 1, tables: 1, depth: 2 }],
  ['outcomes/MedicationRefills.tsx', { fn: 'MedicationRefills', title: 'Medication Refills', crumbs: '[{ label: "Patient Outcomes" }]', chips: 'outcomesChips', kpis: 3, tables: 1, depth: 2 }],
  ['outcomes/LabCadence.tsx', { fn: 'LabCadence', title: 'Lab Cadence', crumbs: '[{ label: "Patient Outcomes" }]', chips: 'outcomesChips', kpis: 2, charts: 1, tables: 1, depth: 2 }],
];

function getImportPath(depth) {
  const prefix = depth === 1 ? '..' : '../..';
  return prefix;
}

function buildSkeletonBody(cfg) {
  const parts = [];

  // KPI cards
  if (cfg.kpis > 0) {
    const cols = cfg.kpiCols || Math.min(cfg.kpis, 3);
    parts.push(`        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-${cols} mb-6">`);
    for (let i = 0; i < cfg.kpis; i++) {
      parts.push(`          <KpiCardSkeleton />`);
    }
    parts.push(`        </div>`);
  }

  // Charts
  if (cfg.charts > 0) {
    if (cfg.charts === 1) {
      parts.push(`        <ChartSkeleton height={280} className="mb-6" />`);
    } else {
      parts.push(`        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6">`);
      for (let i = 0; i < cfg.charts; i++) {
        parts.push(`          <ChartSkeleton height={280} />`);
      }
      parts.push(`        </div>`);
    }
  }

  // Panels
  if (cfg.panels > 0) {
    const pCols = cfg.panelCols || 2;
    parts.push(`        <div className="grid grid-cols-1 gap-4 lg:grid-cols-${pCols} mb-6">`);
    for (let i = 0; i < cfg.panels; i++) {
      parts.push(`          <PanelSkeleton height={220} />`);
    }
    parts.push(`        </div>`);
  }

  // Pie charts
  if (cfg.pieCharts > 0) {
    parts.push(`        <PieChartSkeleton className="mb-6" />`);
  }

  // Heat tables
  if (cfg.heatTables > 0) {
    for (let i = 0; i < cfg.heatTables; i++) {
      parts.push(`        <PanelSkeleton height={180} className="mb-6" />`);
    }
  }

  // Tables
  if (cfg.tables > 0) {
    parts.push(`        <TableSkeleton rows={6} cols={5} />`);
  }

  return parts.join('\n');
}

function getNeededSkeletons(cfg) {
  const needed = new Set();
  if (cfg.kpis > 0) needed.add('KpiCardSkeleton');
  if (cfg.charts > 0) needed.add('ChartSkeleton');
  if (cfg.panels > 0 || cfg.heatTables > 0) needed.add('PanelSkeleton');
  if (cfg.pieCharts > 0) needed.add('PieChartSkeleton');
  if (cfg.tables > 0) needed.add('TableSkeleton');
  // Minimum: at least show something
  if (needed.size === 0) needed.add('TableSkeleton');
  return [...needed];
}

let modified = 0;
let skipped = 0;

for (const [relPath, cfg] of pages) {
  const filePath = path.join(PAGES_DIR, relPath);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has skeleton
  if (content.includes('usePageLoading')) {
    console.log(`SKIP (already done): ${relPath}`);
    skipped++;
    continue;
  }

  const prefix = getImportPath(cfg.depth);
  const skeletons = getNeededSkeletons(cfg);

  // Build import lines
  const hookImport = `import { usePageLoading } from "${prefix}/hooks/usePageLoading";`;
  const skelImport = `import { ${skeletons.join(', ')} } from "${prefix}/components/dashboard/SkeletonPrimitives";`;

  // Find the function declaration
  const fnRegex = new RegExp(`export default function ${cfg.fn}\\([^)]*\\)\\s*\\{`);
  const fnMatch = content.match(fnRegex);
  if (!fnMatch) {
    console.log(`SKIP (no match for fn): ${relPath} — looking for ${cfg.fn}`);
    skipped++;
    continue;
  }

  // 1. Add imports right before the function (or after last import)
  const lastImportIdx = content.lastIndexOf('\nimport ');
  const endOfLastImport = content.indexOf('\n', content.indexOf(';', lastImportIdx));
  content = content.slice(0, endOfLastImport + 1) + hookImport + '\n' + skelImport + '\n' + content.slice(endOfLastImport + 1);

  // Re-find function after imports were added
  const fnMatch2 = content.match(fnRegex);
  const fnIdx = content.indexOf(fnMatch2[0]);
  const afterFnBrace = fnIdx + fnMatch2[0].length;

  // Build the Page props
  let pageProps = `title="${cfg.title}"`;
  if (cfg.crumbs) pageProps += ` crumbs={${cfg.crumbs}}`;
  // We skip chips in the skeleton since it may be a variable computed inside the function

  // Build skeleton block
  const skeletonBlock = `
  const isLoading = usePageLoading();

  if (isLoading) {
    return (
      <Page ${pageProps}>
${buildSkeletonBody(cfg)}
      </Page>
    );
  }
`;

  content = content.slice(0, afterFnBrace) + skeletonBlock + content.slice(afterFnBrace);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`DONE: ${relPath}`);
  modified++;
}

console.log(`\nTotal: ${modified} modified, ${skipped} skipped`);
