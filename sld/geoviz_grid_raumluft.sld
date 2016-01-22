<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
  <NamedLayer>
    <Name>geoviz_grid_raumluft</Name>
    <UserStyle>
      <Name>grid</Name>
      <Title>grid_type_heatmap</Title>
      <Abstract></Abstract>
      <FeatureTypeStyle>
        <Rule>
          <RasterSymbolizer>
            <Opacity>1.0</Opacity>
            <ColorMap>
              <ColorMapEntry color="#000000" quantity="-500" label="nodata" opacity="0.0" />
              <ColorMapEntry color="#1A9641" quantity="75" label="75" />
              <ColorMapEntry color="#A6D96A" quantity="147" label="147" />
              <ColorMapEntry color="#FFFFC0" quantity="220" label="220" />
              <ColorMapEntry color="#FDAE61" quantity="292" label="292" />
              <ColorMapEntry color="#D7191C" quantity="364" label="364" />
            </ColorMap>
          </RasterSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
