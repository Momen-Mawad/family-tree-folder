export type Coordinates = {
  coordinates: number[];
  location_desc: string;
};

export type AssetRAG = {
  climate_regulation: number;
  fiber_and_other_materials: number;
  flood_and_storm_protection: number;
  pollination: number;
  surface_water: number;
};

export type CompanyRAG = {
  first_order_climate_regulation: number;
  first_order_fiber_and_other_materials: number;
  first_order_flood_and_storm_protection: number;
  first_order_pollination: number;
  first_order_surface_water: number;
};

export type OutputAssetLevel = {
  id: number;
  ISIN: string;
  location: Coordinates[];
  parent_company_name: string;
  factset_entity_id: string;
  relevance: number;
  ENCORE_production: string;
  RAG: AssetRAG[];
};

export type CompanyWholeEs = {
  first_order_exposure_whole: number;
  first_order_rag_whole: number;
};

export type CompanyTop5Es = {
  first_order_exposure_top5: number;
  first_order_rag_top5: number;
};

export type CompanyFirstOrderRiskAggregate = {
  whole_ES: CompanyWholeEs[];
  top5_ES: CompanyTop5Es[];
};

export type CompanyFirstOrderExposure = {
  first_order_exposure_Animal_basedenergy: number;
  first_order_exposure_buffering_mass_flows: number;
  first_order_exposure_Climateregulation: number;
  first_order_exposure_Diseasecontrol: number;
  first_order_exposure_f_s_protection: number;
  first_order_exposure_Fibresandothermaterials: number;
  first_order_exposure_Groundwater: number;
  first_order_exposure_Maintainnurseryhabitats: number;
  first_order_exposure_mass_stab_erosion_cont: number;
  first_order_exposure_Pestcontrol: number;
  first_order_exposure_Pollination: number;
  first_order_exposure_Soilquality: number;
  first_order_exposure_Surfacewater: number;
  first_order_exposure_Waterflowmaintenance: number;
  first_order_exposure_Waterquality: number;
};

export type CompanyUpstreamExposure = {
  upstream_exposure_Animal_basedenergy: number;
  upstream_exposure_buffering_mass_flows: number;
  upstream_exposure_Climateregulation: number;
  upstream_exposure_Diseasecontrol: number;
  upstream_exposure_f_s_protection: number;
  upstream_exposure_Fibresandothermaterials: number;
  upstream_exposure_Groundwater: number;
  upstream_exposure_Maintainnurseryhabitats: number;
  upstream_exposure_mass_stab_erosion_cont: number;
  upstream_exposure_Pestcontrol: number;
  upstream_exposure_Pollination: number;
  upstream_exposure_Soilquality: number;
  upstream_exposure_Surfacewater: number;
  upstream_exposure_Waterflowmaintenance: number;
  upstream_exposure_Waterquality: number;
};

export type CompanyTrendFutureExposure = {
  fut_expo_climate_regulation: string;
  fut_expo_fiber_and_other_materials: string;
  fut_expo_flood_and_storm_protection: string;
  fut_expo_pollination: string;
  fut_expo_surface_water: string;
};

export type CompanyTrend = {
  time_frame: string;
  description: string;
  future_exposure: CompanyTrendFutureExposure[];
};

export type CompanyFinancialMetrics = {
  value_at_risk: number;
  sharpe_ratio_1: number;
};

export type OutputCompanyLevel = {
  parent_company_name: string;
  ISIN: string;
  upstream_risk_aggregate: number;
  RAG: CompanyRAG[];
  first_order_risk_aggregate: CompanyFirstOrderRiskAggregate[];
  first_order_exposure: CompanyFirstOrderExposure[];
  upstream_exposure: CompanyUpstreamExposure[];
  trend: CompanyTrend[];
  financial_metrics: CompanyFinancialMetrics[];
};

export type PortfolioRAG = {
  first_order_climate_regulation: number;
  first_order_fiber_and_other_materials: number;
  first_order_flood_and_storm_protection: number;
  first_order_pollination: number;
  first_order_surface_water: number;
};

export type PortfolioWholeEs = {
  exposure_whole: number;
  rag_whole: number;
};

export type PortfolioTop5Es = {
  exposure_top5: number;
  rag_top5: number;
};

export type PortfolioRiskAggregate = {
  whole_ES: PortfolioWholeEs[];
  top5_ES: PortfolioTop5Es[];
};

export type PortfolioExposure = {
  first_order_exposure_Animal_basedenergy: number;
  first_order_exposure_buffering_mass_flows: number;
  first_order_exposure_Climateregulation: number;
  first_order_exposure_Diseasecontrol: number;
  first_order_exposure_f_s_protection: number;
  first_order_exposure_Fibresandothermaterials: number;
  first_order_exposure_Groundwater: number;
  first_order_exposure_Maintainnurseryhabitats: number;
  first_order_exposure_mass_stab_erosion_cont: number;
  first_order_exposure_Pestcontrol: number;
  first_order_exposure_Pollination: number;
  first_order_exposure_Soilquality: number;
  first_order_exposure_Surfacewater: number;
  first_order_exposure_Waterflowmaintenance: number;
  first_order_exposure_Waterquality: number;
};

export type OutputPortfolioLevel = {
  RAG: PortfolioRAG[];
  risk_aggregate: PortfolioRiskAggregate[];
  exposure: PortfolioExposure[];
};

export interface ValueAtRisksOverallDataType {
  key: React.Key;
  whole: number | string;
  top5: number | string;
};

export interface ValueAtRisksEsDataType {
  key: React.Key;
  es1: number | string;
  es2: number | string;
  es3: number | string;
  es4: number | string;
  es5: number | string;
  es6?: number | string;
  es7?: number | string;
  es8?: number | string;
  es9?: number | string;
  es10?: number | string;
  es11?: number | string;
  es12?: number | string;
  es13?: number | string;
  es14?: number | string;
  es15?: number | string;
};

export type FinancialRiskMetrics = {
  key: React.Key;
  parent_company_name: string;
  isin: string;
  sharpeRatio1: number | string;
  sharpeRatio2: number | string;
  valueAtRisk: number | string;
};

export interface UpstreamDependencies extends ValueAtRisksEsDataType {
  isin: string;
  riskAggregate: number;
};

export interface FirstOrder extends ValueAtRisksOverallDataType, ValueAtRisksEsDataType {
  isin: string;
};

export type ValueAtRiskProps = {
  calculatedRisks: CalculatedRisks;
};

export type CalculatedRisks = {
  output_portfolio_level: OutputPortfolioLevel[];
  output_company_level: OutputCompanyLevel[];
  output_asset_level: OutputAssetLevel[];
};

