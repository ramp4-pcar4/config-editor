export type BasemapOption = {
    id: string;
    name: string;
    description: string;
    altText: string;
    projection: 'lambert' | 'mercator';
    projectionLabel: string;
    thumbnailUrls: string[];
    config: {
        id: string;
        name: string;
        description: string;
        altText: string;
        thumbnailUrl?: string;
        layers: Array<{
            id: string;
            layerType: string;
            url?: string;
        }>;
        tileSchemaId: string;
    };
};

export const BASEMAP_OPTIONS: BasemapOption[] = [
    {
        id: 'baseNrCan',
        name: 'Transportation (CBMT)',
        description:
            'Displays topographical features and political boundaries, while focusing primarily on transport routes. Contains topographical labels.',
        altText: 'Transportation (CBMT)',
        projection: 'lambert',
        projectionLabel: 'Lambert',
        thumbnailUrls: [
            'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBMT3978/MapServer/tile/8/285/268',
            'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBMT3978/MapServer/tile/8/285/269'
        ],
        config: {
            id: 'baseNrCan',
            name: 'Transportation (CBMT - Labels)',
            description:
                'The basic transport map (CBMT - labels) displays topographical features and political boundaries, while focusing primarily on transport routes. Contains topographical labels.',
            altText: 'Transportation (CBMT - Labels)',
            layers: [
                {
                    id: 'CBMT',
                    layerType: 'esri-tile',
                    url: 'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBMT3978/MapServer'
                }
            ],
            tileSchemaId: 'EXT_NRCAN_Lambert_3978#LOD_NRCAN_Lambert_3978'
        }
    },
    {
        id: 'baseSimple',
        name: 'Simple Land-Water Boundaries',
        description:
            'The Simple Land-Water Boundaries basemap displays basic topographical features, in particular land and water boundaries.',
        altText: 'Simple Land-Water Boundaries',
        projection: 'lambert',
        projectionLabel: 'Lambert',
        thumbnailUrls: [
            'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/Simple/MapServer/tile/8/285/268',
            'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/Simple/MapServer/tile/8/285/269'
        ],
        config: {
            id: 'baseSimple',
            name: 'Simple Land-Water Boundaries',
            description:
                'The Simple Land-Water Boundaries basemap displays basic topographical features, in particular land and water boundaries.',
            altText: 'Simple Land-Water Boundaries',
            layers: [
                {
                    id: 'SMR',
                    layerType: 'esri-tile',
                    url: 'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/Simple/MapServer'
                }
            ],
            tileSchemaId: 'EXT_NRCAN_Lambert_3978#LOD_NRCAN_Lambert_3978'
        }
    },
    {
        id: 'baseCBME_CBCE_HS_RO_3978',
        name: 'Elevation (CBME)',
        description:
            'The basic elevation map (CBME) illustrates differences in elevation using contour lines and colour gradients.',
        altText: 'Elevation (CBME)',
        projection: 'lambert',
        projectionLabel: 'Lambert',
        thumbnailUrls: [
            'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBME_CBCE_HS_RO_3978/MapServer/tile/8/285/268',
            'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBME_CBCE_HS_RO_3978/MapServer/tile/8/285/269'
        ],
        config: {
            id: 'baseCBME_CBCE_HS_RO_3978',
            name: 'Elevation (CBME)',
            description:
                'The basic elevation map (CBME) illustrates differences in elevation using contour lines and colour gradients.',
            altText: 'Elevation (CBME)',
            layers: [
                {
                    id: 'CBME_CBCE_HS_RO_3978',
                    layerType: 'esri-tile',
                    url: 'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBME_CBCE_HS_RO_3978/MapServer'
                }
            ],
            tileSchemaId: 'EXT_NRCAN_Lambert_3978#LOD_NRCAN_Lambert_3978'
        }
    },
    {
        id: 'baseEsriWorld',
        name: 'World Imagery',
        description:
            'World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide.',
        altText: 'World Imagery',
        projection: 'mercator',
        projectionLabel: 'Mercator',
        thumbnailUrls: [
            'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/8/91/74',
            'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/8/91/75'
        ],
        config: {
            id: 'baseEsriWorld',
            name: 'World Imagery',
            description:
                'World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide.',
            altText: 'World Imagery',
            layers: [
                {
                    id: 'World_Imagery',
                    layerType: 'esri-tile',
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'
                }
            ],
            tileSchemaId: 'EXT_ESRI_World_AuxMerc_3857#LOD_ESRI_World_AuxMerc_3857'
        }
    },
    {
        id: 'baseEsriPhysical',
        name: 'World Physical Map',
        description:
            'This map presents the Natural Earth physical map at 1.24km per pixel for the world and 500m for the coterminous United States.',
        altText: 'World Physical Map',
        projection: 'mercator',
        projectionLabel: 'Mercator',
        thumbnailUrls: [
            'https://services.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/tile/8/91/74',
            'https://services.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/tile/8/91/75'
        ],
        config: {
            id: 'baseEsriPhysical',
            name: 'World Physical Map',
            description:
                'This map presents the Natural Earth physical map at 1.24km per pixel for the world and 500m for the coterminous United States.',
            altText: 'World Physical Map',
            layers: [
                {
                    id: 'World_Physical_Map',
                    layerType: 'esri-tile',
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer'
                }
            ],
            tileSchemaId: 'EXT_ESRI_World_AuxMerc_3857#LOD_ESRI_World_AuxMerc_3857'
        }
    },
    {
        id: 'baseEsriRelief',
        name: 'World Shaded Relief',
        description:
            'This map portrays surface elevation as shaded relief. This map is used as a basemap layer to add shaded relief to other GIS maps, such as the ArcGIS Online World Street Map.',
        altText: 'World Shaded Relief',
        projection: 'mercator',
        projectionLabel: 'Mercator',
        thumbnailUrls: [
            'https://services.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer/tile/8/91/74',
            'https://services.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer/tile/8/91/75'
        ],
        config: {
            id: 'baseEsriRelief',
            name: 'World Shaded Relief',
            description:
                'This map portrays surface elevation as shaded relief. This map is used as a basemap layer to add shaded relief to other GIS maps, such as the ArcGIS Online World Street Map.',
            altText: 'World Shaded Relief',
            layers: [
                {
                    id: 'World_Shaded_Relief',
                    layerType: 'esri-tile',
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer'
                }
            ],
            tileSchemaId: 'EXT_ESRI_World_AuxMerc_3857#LOD_ESRI_World_AuxMerc_3857'
        }
    },
    {
        id: 'baseEsriStreet',
        name: 'World Street Map',
        description: 'This worldwide street map presents highway-level data for the world.',
        altText: 'World Street Map',
        projection: 'mercator',
        projectionLabel: 'Mercator',
        thumbnailUrls: [
            'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/8/91/74',
            'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/8/91/74'
        ],
        config: {
            id: 'baseEsriStreet',
            name: 'World Street Map',
            description: 'This worldwide street map presents highway-level data for the world.',
            altText: 'ESWorld Street Map',
            layers: [
                {
                    id: 'World_Street_Map',
                    layerType: 'esri-tile',
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer'
                }
            ],
            tileSchemaId: 'EXT_ESRI_World_AuxMerc_3857#LOD_ESRI_World_AuxMerc_3857'
        }
    },
    {
        id: 'baseEsriTerrain',
        name: 'World Terrain Base',
        description:
            'This map is designed to be used as a base map by GIS professionals to overlay other thematic layers such as demographics or land cover.',
        altText: 'World Terrain Base',
        projection: 'mercator',
        projectionLabel: 'Mercator',
        thumbnailUrls: [
            'https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer/tile/8/91/74',
            'https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer/tile/8/91/75'
        ],
        config: {
            id: 'baseEsriTerrain',
            name: 'World Terrain Base',
            description:
                'This map is designed to be used as a base map by GIS professionals to overlay other thematic layers such as demographics or land cover.',
            altText: 'World Terrain Base',
            layers: [
                {
                    id: 'World_Terrain_Base',
                    layerType: 'esri-tile',
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer'
                }
            ],
            tileSchemaId: 'EXT_ESRI_World_AuxMerc_3857#LOD_ESRI_World_AuxMerc_3857'
        }
    },
    {
        id: 'baseEsriTopo',
        name: 'World Topographic Map',
        description:
            'This map is designed to be used as a basemap by GIS professionals and as a reference map by anyone.',
        altText: 'World Topographic Map',
        projection: 'mercator',
        projectionLabel: 'Mercator',
        thumbnailUrls: [
            'https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/8/91/74',
            'https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/8/91/75'
        ],
        config: {
            id: 'baseEsriTopo',
            name: 'World Topographic Map',
            description:
                'This map is designed to be used as a basemap by GIS professionals and as a reference map by anyone.',
            altText: 'World Topographic Map',
            layers: [
                {
                    id: 'World_Topo_Map',
                    layerType: 'esri-tile',
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer'
                }
            ],
            tileSchemaId: 'EXT_ESRI_World_AuxMerc_3857#LOD_ESRI_World_AuxMerc_3857'
        }
    },
    {
        id: 'baseOpenStreetMap',
        name: 'OpenStreetMap',
        description: 'Open sourced topographical map.',
        altText: 'OpenStreetMap',
        projection: 'mercator',
        projectionLabel: 'Mercator',
        thumbnailUrls: [
            'https://www.openstreetmap.org/assets/about/osm-a74d2c94082260032c133b9d206ee2fdd911e5c82bf03daae10393a02d7b4809.png'
        ],
        config: {
            id: 'baseOpenStreetMap',
            name: 'OpenStreetMap',
            description: 'Open sourced topographical map.',
            altText: 'OpenStreetMap',
            thumbnailUrl:
                'https://www.openstreetmap.org/assets/about/osm-a74d2c94082260032c133b9d206ee2fdd911e5c82bf03daae10393a02d7b4809.png',
            layers: [
                {
                    id: 'Open_Street_Map',
                    layerType: 'osm-tile'
                }
            ],
            tileSchemaId: 'EXT_ESRI_World_AuxMerc_3857#LOD_ESRI_World_AuxMerc_3857'
        }
    }
];
