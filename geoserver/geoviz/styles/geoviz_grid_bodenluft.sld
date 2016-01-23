<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
  <NamedLayer>
    <Name>geoviz_grid_bodenluft</Name>
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
              <ColorMapEntry color="#1A9641" quantity="26" label="26" />
              <ColorMapEntry color="#A6D96A" quantity="84" label="84" />
              <ColorMapEntry color="#FFFFC0" quantity="142" label="142" />
              <ColorMapEntry color="#FDAE61" quantity="200" label="200" />
              <ColorMapEntry color="#D7191C" quantity="258" label="258" />
            </ColorMap>
          </RasterSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>