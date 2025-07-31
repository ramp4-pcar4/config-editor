// aligns with config values
// describes the source of the layer
export const enum LayerType {
    // ESRI
    FEATURE = 'esri-feature',
    MAPIMAGE = 'esri-map-image',
    TILE = 'esri-tile',
    IMAGERY = 'esri-imagery',
    GRAPHIC = 'esri-graphic',

    // OGS
    WMS = 'ogc-wms',
    WFS = 'ogc-wfs',

    // File Based
    GEOJSON = 'file-geojson',
    GEOJSONZIPPED = 'file-zip-geojson',
    CSV = 'file-csv',
    SHAPEFILE = 'file-shape',
    FLATGEOBUF = 'file-fgb',
    FLATGEOBUFZIPPED = 'file-zip-fgb',

    // Other
    OSM = 'osm-tile', // open street map

    // Data
    DATACSV = 'data-csv',
    DATAJSON = 'data-json',
    DATATABLE = 'data-esri-table',

    UNKNOWN = 'unknown',

    SUBLAYER = 'sublayer'
}

export enum LayerIdentifyMode {
    GEOMETRIC = 'geometric', // uses geometric intersection; feature symbology is not considered
    SYMBOLIC = 'symbolic', // uses symbol intersection; not applicable for raster layers
    HYBRID = 'hybrid', // combines geometric and symbolic results
    NONE = 'none' // value for layers that don't support identify
}

export interface EpsgLookup {
    (code: string | number): Promise<string>;
}

export interface DrawOrder {
    field: string;
    ascending: boolean; // true means smaller values are drawn ON TOP of larger values. false is the opposite
}

export interface ScaleHelper {
    units: string;
    isImperialScale: boolean;
    pixels: number;
    distance: number;
}

// Contains properties needed to display mouse/crosshairs co-ords on the map-caption bar
export interface MapCoords {
    disabled?: boolean;
    formattedString?: string;
}

// ----------------------- CLIENT CONFIG INTERFACES -----------------------------------

// TODO migrate these to /geo/api/geo-common ? if we need config interfaces before creating an instance,
//      having them defined here might cause circular reference.

export enum LayerControl {
    BoundaryZoom = 'boundaryZoom',
    Datatable = 'datatable',
    Identify = 'identify',
    Metadata = 'metadata',
    Opacity = 'opacity',
    Refresh = 'refresh',
    Reload = 'reload',
    Remove = 'remove',
    Settings = 'settings',
    Symbology = 'symbology',
    Visibility = 'visibility'
}

// Attribution interface that contains all the core attributes of the attribution node
export interface Attribution {
    text?: { disabled?: boolean; value?: string };
    logo?: {
        disabled?: boolean;
        altText?: string;
        value?: string;
        link?: string;
    };
}

// Contains properties needed to display scale on the map-caption bar
export interface ScaleBar {
    disabled?: boolean;
    label?: string;
    width?: string;
    isImperialScale?: boolean;
}

export interface RampSpatialReference {
    wkid?: number;
    latestWkid?: number;
    wkt?: string;
}

export interface RampLayerStateConfig {
    visibility?: boolean;
    opacity?: number;
    identify?: boolean;
    hovertips?: boolean;
}

export interface RampLayerFieldInfoConfig {
    name: string;
    alias?: string;
    trim?: boolean;
}

export interface RampLayerFieldMetadataConfig {
    fieldInfo?: Array<RampLayerFieldInfoConfig>;
    exclusiveFields?: boolean; // default to false. if true, means we only recognize and download field in fieldInfo. if false, we download all fields, and fieldInfo provides additional data as needed
    enforceOrder?: boolean; //default to false. if true, then order the fields in the same order as fieldInfo. if false, randomize ordering of field array
}

// i.e. a dynamic layer child
export interface RampLayerMapImageSublayerConfig {
    // A+ name
    index: number;
    name?: string;
    nameField?: string;
    state?: RampLayerStateConfig;
    // following items need to be flushed out
    extent?: RampExtentConfig;
    controls?: Array<LayerControl>;
    disabledControls?: Array<LayerControl>;
    cosmetic?: boolean;
    fieldMetadata?: RampLayerFieldMetadataConfig;
    initialFilteredQuery?: string;
    permanentFilteredQuery?: string;
    customRenderer?: any;
    fixtures?: any; // layer-based fixture config
}

// i.e. a wms layer child
export interface RampLayerWmsSublayerConfig {
    id: string; // this is the "name" on the service
    name?: string; // this is display name in ramp. would override "title" on the service
    state?: RampLayerStateConfig;
    // following items need to be flushed out
    controls?: Array<LayerControl>;
    disabledControls?: Array<LayerControl>;
    currentStyle?: string; // style to be used
    styleLegends?: Array<{ name: string; url: string }>; // map of styles to legend graphic url. overrides service urls.
    fixtures?: any; // layer-based fixture config
}

// TODO investigate if we want to make a fancy interface heirarchy instead of pile-of-?-properties
export interface RampLayerConfig {
    id: string;
    layerType: LayerType;
    url: string; // really this should be optional. Graphic layers & raw geojson don't use it. But then we would need undefined checks in majority of code.
    name?: string;
    state?: RampLayerStateConfig;
    customRenderer?: any;
    // NOTE would uncomment if issue #1019 gets done
    refreshInterval?: number;
    expectedDrawTime?: number;
    expectedLoadTime?: number;
    fieldMetadata?: RampLayerFieldMetadataConfig;
    nameField?: string;
    tooltipField?: string;
    featureInfoMimeType?: string; // used by WMS layer
    controls?: Array<LayerControl>;
    disabledControls?: Array<LayerControl>;
    sublayers?: Array<RampLayerMapImageSublayerConfig> | Array<RampLayerWmsSublayerConfig>;
    extent?: RampExtentConfig;
    latField?: string; // csv coord field
    longField?: string; // csv coord field
    mouseTolerance?: number; // mouse tolerance
    touchTolerance?: number; // touch tolerance
    metadata?: { url: string; name?: string };
    catalogueUrl?: string;
    fixtures?: any; // layer-based fixture config
    cosmetic?: boolean;
    colour?: string;
    imageFormat?: string;
    initialFilteredQuery?: string;
    permanentFilteredQuery?: string;
    drawOrder?: Array<DrawOrder>; // feature drawing order
    identifyMode?: LayerIdentifyMode;
    caching?: boolean; // whether to preserve raw data in file and WFS layers
    rawData?: any; // used for static data, like geojson string, shapefile guts
}

export interface RampExtentConfig {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    spatialReference: RampSpatialReference;
}

export interface RampExtentSetConfig {
    id: string;
    default?: RampExtentConfig;
    full?: RampExtentConfig;
    maximum?: RampExtentConfig;
}

export interface RampBasemapLayerConfig {
    id?: string;
    layerType?: LayerType;
    url?: string;
    opacity?: number;
}

export interface RampBasemapConfig {
    id: string;
    name?: string;
    description?: string;
    altText?: string;
    hideThumbnail?: boolean;
    thumbnailUrl?: string;
    tileSchemaId?: string;
    layers?: Array<RampBasemapLayerConfig>;
    attribution?: Attribution;
}

export interface RampTileSchemaConfig {
    id: string;
    name: string;
    extentSetId: string;
    lodSetId: string;
    thumbnailTileUrls?: Array<string>;
    hasNorthPole?: boolean;
}

export interface RampLodSetConfig {
    id: string;
    lods?: Array<RampLodConfig>;
}

export interface RampLodConfig {
    level?: number;
    resolution?: number;
    scale?: number;
}

// Contains properties for compoents on the map caption bar
export interface MapCaptionConfig {
    mapCoords: { disabled?: boolean; formatter?: string };
    scaleBar: { disabled?: boolean; imperialScale?: boolean };
    langToggle?: { disabled?: boolean };
}

// actual ramp config is kinda wonky, split over lots of classes
// for now this will just serve as a nice type for the config
export interface RampMapConfig {
    lodSets: Array<RampLodSetConfig>;
    extentSets: Array<RampExtentSetConfig>;
    basemaps: Array<RampBasemapConfig>;
    tileSchemas: Array<RampTileSchemaConfig>;
    initialBasemapId: string;
    caption?: MapCaptionConfig;
    pointZoomScale?: number;
    mapMouseThrottle?: number;
}

/**
 * The configuration object for RAMP apps
 *
 * @interface RampConfig
 */
export interface RampConfig {
    map: RampMapConfig;
    layers: RampLayerConfig[];
    fixtures: { [key: string]: any };
    panels?: {
        open?: {
            id: string;
            screen?: string;
            pin?: boolean;
        }[];
        reorderable?: boolean;
    };
    system?: {
        proxyUrl?: string;
        zoomIcon?: string;
        animate?: boolean;
        exposeOid?: boolean;
        suppressNumberLocalization?: boolean;
        exposeMeasurements?: boolean;
        scrollToInstance?: boolean;
    };
}

/**
 * Multiple configuration objects pertaining to different languages for RAMP apps
 * Can optionally provide a list of starting fixtures to load when RAMP loads
 *
 * @interface RampConfigs
 */
export interface RampConfigs {
    startingFixtures?: string[];
    configs: {
        [key: string]: RampConfig;
    };
}

export interface RampOptions {
    loadDefaultFixtures?: boolean;
    loadDefaultEvents?: boolean;
    startRequired?: boolean;
}

export interface PanelTeleportObject {
    /**
     * The element to teleport the panel to. Can be the actual element or a query selector string.
     *
     * @type string | Element
     * @memberof PanelTeleportObject
     */
    target?: string | Element;

    /**
     * Whether or not to show the panel header.
     *
     * @type boolean
     * @memberof PanelTeleportObject
     */
    showHeader?: boolean;

    /**
     * Whether or not opening/closing the panel will show/hide an appbar button for it.
     * Will only apply to temporary appbar buttons.
     *
     * @type boolean
     * @memberof PanelTeleportObject
     */
    showAppbarButton?: boolean;

    /**
     * Custom class breakpoints for the teleported panel.
     *
     * @type object
     * @memberof PanelTeleportObject
     */
    breakpoints?: { [key: string]: number | undefined };
}

/** Type definitions exclusive to config editor */

export interface Field {
    type: string; // string, boolean, number, enum, object, array
    property: string;
    options?: Array<{ value: any; label: string }>; // options for if property type is enum
    placeholder?: string;
    min?: number;
    max?: number;
    title: string;
    description?: string;
    required?: boolean;
    fields?: Array<Field>; // only applies iff type === object. Too lazy to make more interfaces to make this clearer.
}
