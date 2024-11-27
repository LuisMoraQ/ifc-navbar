export interface IfcRelDefinesByProperties  {
    GlobalId: string;
    OwnerHistory: any; // Define el tipo adecuado según el contexto
    Name: string;
    Description: string;
    RelatedObjects: any[]; // Define el tipo adecuado según el contexto
    RelatingPropertyDefinition: any; // Define el tipo adecuado según el contexto
    type: number;
  }

  export interface IfcDoorLiningProperties  {
    GlobalId: string;
    OwnerHistory: any; // Define el tipo adecuado según el contexto
    Name: string;
    Description: string;
    LiningDepth: number;
    LiningThickness: number;
    ThresholdDepth: number;
    ThresholdThickness: number;
    TransomThickness: number;
    TransomOffset: number;
    LiningOffset: number;
    ThresholdOffset: number;
    CasingThickness: number;
    CasingDepth: number;
    ShapeAspectStyle: any; // Define el tipo adecuado según el contexto
    type: number;
  }
  

  export interface IfcDoorPanelProperties {
    GlobalId: string;
    OwnerHistory: any; // Define el tipo adecuado según el contexto
    Name: string;
    Description: string;
    PanelDepth: number;
    PanelOperation: string; // Puedes ajustar el tipo según lo que representa "PanelOperation"
    PanelWidth: number;
    PanelPosition: string; // Ajusta el tipo según lo que representa "PanelPosition"
    ShapeAspectStyle: any; // Define el tipo adecuado según el contexto
    type: number;
  }

  export interface IfcDoorStyle {
    GlobalId: string;
    OwnerHistory: any; // Define el tipo adecuado según el contexto
    Name: string;
    Description: string;
    ApplicableOccurrence: string; // Ajusta el tipo si es necesario
    HasPropertySets: any[]; // Ajusta el tipo según lo que representa 'HasPropertySets'
    RepresentationMaps: any[]; // Ajusta el tipo según lo que representa 'RepresentationMaps'
    Tag: string;
    OperationType: string; // Ajusta el tipo según lo que representa 'OperationType'
    ConstructionType: string; // Ajusta el tipo según lo que representa 'ConstructionType'
    ParameterTakesPrecedence: boolean; // Ajusta el tipo según lo que representa 'ParameterTakesPrecedence'
    Sizeable: boolean; // Ajusta
  }  

  export interface IfcMaterial {
    Name: string;
    type: number;
  }

  export interface IfcMaterialDefinitionRepresentation {
    Name: string;
    Description: string;
    Representations: any[]; // Ajusta el tipo según lo que representa 'Representations'
    RepresentedMaterial: any; // Ajusta el tipo según lo que representa 'RepresentedMaterial'
    type: number;
  }
  

  export interface IfcMaterialList {
    Materials: any[]; // Ajusta el tipo según lo que representa 'Materials'
    type: number;
  }
  

  export interface IfcDoor {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    ObjectType: string; // Ajusta el tipo si es necesario
    ObjectPlacement: any; // Define el tipo adecuado según el contexto
    Representation: any; // Define el tipo adecuado según el contexto
    Tag: string;
    OverallHeight: number;
    OverallWidth: number;
    type: number;
  }
  

  export interface IfcPropertySingleValue {
    Name: string;
    Description: string;
    NominalValue: any; // Ajusta el tipo según lo que representa 'NominalValue'
    Unit: any; // Ajusta el tipo según lo que representa 'Unit'
    type: number;
  }

  export interface IfcPropertySet {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    HasProperties: any[]; // Ajusta el tipo según lo que representa 'HasProperties'
    type: number;
  }

  export interface IfcRelDefinesByProperties {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    RelatedObjects: any[]; // Ajusta el tipo según lo que representa 'RelatedObjects'
    RelatingPropertyDefinition: any; // Ajusta el tipo según lo que representa 'RelatingPropertyDefinition'
    type: number;
  }

  
  export interface IfcFurnishingElement {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    ObjectType: string; // Ajusta el tipo según lo que representa 'ObjectType'
    ObjectPlacement: any; // Ajusta el tipo según lo que representa 'ObjectPlacement'
    Representation: any; // Ajusta el tipo según lo que representa 'Representation'
    Tag: string;
    type: number;
  }
  
  export interface IfcWallStandardCase {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    ObjectType: string; // Ajusta el tipo según lo que representa 'ObjectType'
    ObjectPlacement: any; // Ajusta el tipo según lo que representa 'ObjectPlacement'
    Representation: any; // Ajusta el tipo según lo que representa 'Representation'
    Tag: string;
    type: number;
  }

  export interface IfcMaterialLayerSetUsage {
    ForLayerSet: any; // Ajusta el tipo según lo que representa 'ForLayerSet'
    LayerSetDirection: string; // Ajusta el tipo según lo que representa 'LayerSetDirection'
    DirectionSense: string; // Ajusta el tipo según lo que representa 'DirectionSense'
    OffsetFromReferenceLine: number; // Ajusta el tipo según lo que representa 'OffsetFromReferenceLine'
    type: number;
  }

  export interface IfcRelDefinesByProperties {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    RelatedObjects: any[]; // Ajusta el tipo según lo que representa 'RelatedObjects'
    RelatingPropertyDefinition: any; // Ajusta el tipo según lo que representa 'RelatingPropertyDefinition'
    type: number;
  }
  
  export interface IfcFlowTerminal  {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    ObjectType: string; // Ajusta el tipo según lo que representa 'ObjectType'
    ObjectPlacement: any; // Ajusta el tipo según lo que representa 'ObjectPlacement'
    Representation: any; // Ajusta el tipo según lo que representa 'Representation'
    Tag: string;
    type: number;
  }

  export interface IfcMaterialLayerSetUsage{
    ForLayerSet: any; // Ajusta el tipo según lo que representa 'ForLayerSet'
    LayerSetDirection: string; // Ajusta el tipo según lo que representa 'LayerSetDirection'
    DirectionSense: string; // Ajusta el tipo según lo que representa 'DirectionSense'
    OffsetFromReferenceLine: number; // Ajusta el tipo según lo que representa 'OffsetFromReferenceLine'
    type: number;
  }
  
  export interface IfcWallStandardCase  {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    ObjectType: string; // Ajusta el tipo según lo que representa 'ObjectType'
    ObjectPlacement: any; // Ajusta el tipo según lo que representa 'ObjectPlacement'
    Representation: any; // Ajusta el tipo según lo que representa 'Representation'
    Tag: string;
    type: number;
  }

  export interface IfcCurtainWall  {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    ObjectType: string; // Ajusta el tipo según lo que representa 'ObjectType'
    ObjectPlacement: any; // Ajusta el tipo según lo que representa 'ObjectPlacement'
    Representation: any; // Ajusta el tipo según lo que representa 'Representation'
    Tag: string;
    type: number;
  }
  

  export interface IfcPlateType {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    ApplicableOccurrence: string; // Aju
  }
  
  export interface IfcPlate {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    ObjectType: string; // Ajusta el tipo según lo que representa 'ObjectType'
    ObjectPlacement: any; // Ajusta el tipo según lo que representa 'ObjectPlacement'
    Representation: any; // Ajusta el tipo según lo que representa 'Representation'
    Tag: string;
    type: number;
  }
  
  export interface IfcRelAggregates {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    RelatingObject: any; // Ajusta el tipo según lo que representa 'RelatingObject'
    RelatedObjects: any[]; // Ajusta el tipo según lo que representa 'RelatedObjects'
    type: number;
  }
  
  export interface IfcBuildingElementProxyType{
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    ApplicableOccurrence: string; // Ajusta el tipo según lo que representa 'ApplicableOccurrence'
    HasPropertySets: any[]; // Ajusta el tipo según lo que representa 'HasPropertySets'
    RepresentationMaps: any[]; // Ajusta el tipo según lo que representa 'RepresentationMaps'
    Tag: string;
    ElementType: string; // Ajusta el tipo según lo que representa 'ElementType'
    PredefinedType: string; // Ajusta el tipo según lo que representa 'PredefinedType'
    type: number;
  }
  
  export interface IfcMaterialDefinitionRepresentation  {
    Name: string;
    Description: string;
    Representations: any[]; // Ajusta el tipo según lo que representa 'Representations'
    RepresentedMaterial: any; // Ajusta el tipo según lo que representa 'RepresentedMaterial'
    type: number;
  }

  export interface IfcSlab  {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    ObjectType: string; // Ajusta el tipo según lo que representa 'ObjectType'
    ObjectPlacement: any; // Ajusta el tipo según lo que representa 'ObjectPlacement'
    Representation: any; // Ajusta el tipo según lo que representa 'Representation'
    Tag: string;
    PredefinedType: string; // Ajusta el tipo según lo que representa 'PredefinedType'
    type: number;
  }
  
  export interface IfcSlabType {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    ApplicableOccurrence: string; // Ajusta el tipo según lo que representa 'ApplicableOccurrence'
    HasPropertySets: any[]; // Ajusta el tipo según lo que representa 'HasPropertySets'
    RepresentationMaps: any[]; // Ajusta el tipo según lo que representa 'RepresentationMaps'
    Tag: string;
    ElementType: string; // Ajusta el tipo según lo que representa 'ElementType'
    PredefinedType: string; // Ajusta el tipo según lo que representa 'PredefinedType'
    type: number;
  }
  

  export interface IfcMaterialLayerSetUsage {
    ForLayerSet: any; // Ajusta el tipo según lo que representa 'ForLayerSet'
    LayerSetDirection: string; // Ajusta el tipo según lo que representa 'LayerSetDirection'
    DirectionSense: string; // Ajusta el tipo según lo que representa 'DirectionSense'
    OffsetFromReferenceLine: number; // Ajusta el tipo según lo que representa 'OffsetFromReferenceLine'
    type: number;
  }
  

  export interface IfcOpeningElement  {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    ObjectType: string; // Ajusta el tipo según lo que representa 'ObjectType'
    ObjectPlacement: any; // Ajusta el tipo según lo que representa 'ObjectPlacement'
    Representation: any; // Ajusta el tipo según lo que representa 'Representation'
    Tag: string;
    type: number;
  }

  export interface IfcRelVoidsElement {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    RelatingBuildingElement: any; // Ajusta el tipo según lo que representa 'RelatingBuildingElement'
    RelatedOpeningElement: any; // Ajusta el tipo según lo que representa 'RelatedOpeningElement'
    type: number;
  }
  
  export interface IfcRelVoidsElement  {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según el contexto
    Name: string;
    Description: string;
    RelatingBuildingElement: any; // Ajusta el tipo según lo que representa 'RelatingBuildingElement'
    RelatedOpeningElement: any; // Ajusta el tipo según lo que representa 'RelatedOpeningElement'
    type: number;
  }
  
  export interface IfcTextStyleFontModel {
    Name: string;
    FontFamily: string;
    FontStyle: string; // Ajusta el tipo si tiene un tipo específico, por ejemplo, enum o un conjunto de valores predefinidos
    FontVariant: string; // Ajusta el tipo si tiene un tipo específico
    FontWeight: string; // Ajusta el tipo según los valores que representa 'FontWeight'
    FontSize: number; // Ajusta el tipo si 'FontSize' debe ser un número o un valor con unidad
    type: number;
  }
  
  export interface IfcTextStyleForDefinedFont {
    Colour: string; // Ajusta el tipo si 'Colour' tiene un formato específico, como un código de color HEX o RGB
    BackgroundColour: string; // Ajusta el tipo si 'BackgroundColour' tiene un formato específico
    type: number;
  }
  
  export interface IfcTextStyle {
    Name: string;
    TextCharacterAppearance: any; // Ajusta el tipo según lo que representa 'TextCharacterAppearance'
    TextStyle: any; // Ajusta el tipo según lo que representa 'TextStyle'
    TextFontStyle: any; // Ajusta el tipo según lo que representa 'TextFontStyle'
    type: number;
  }
  
  export interface IfcPlanarExtent  {
    SizeInX: number;
    SizeInY: number;
    type: number;
  }

  export interface IfcTextLiteralWithExtent {
    Literal: string;
    Placement: any; // Ajusta el tipo según lo que representa 'Placement'
    Path: any; // Ajusta el tipo según lo que representa 'Path'
    Extent: any; // Ajusta el tipo según lo que representa 'Extent'
    BoxAlignment: any; // Ajusta el tipo según lo que representa 'BoxAlignment'
    type: number;
  }
  
  export interface IfcAnnotation {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según lo que representa 'OwnerHistory'
    Name: string;
    Description: string;
    ObjectType: string; // Ajusta el tipo si 'ObjectType' tiene un tipo específico
    ObjectPlacement: any; // Ajusta el tipo según lo que representa 'ObjectPlacement'
    Representation: any; // Ajusta el tipo según lo que representa 'Representation'
    type: number;
  }
  
  export interface IfcGridAxis  {
    AxisTag: string; // Ajusta el tipo si 'AxisTag' tiene un tipo específico
    AxisCurve: any; // Ajusta el tipo según lo que representa 'AxisCurve'
    SameSense: boolean; // 'SameSense' parece ser un valor booleano
    type: number;
  }
  
  export interface IfcGrid  {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según lo que representa 'OwnerHistory'
    Name: string;
    Description: string;
    ObjectType: string; // Ajusta el tipo si 'ObjectType' tiene un tipo específico
    ObjectPlacement: any; // Ajusta el tipo según lo que representa 'ObjectPlacement'
    Representation: any; // Ajusta el tipo según lo que representa 'Representation'
    UAxes: any[]; // Ajusta el tipo de los elementos del array según lo que representa 'UAxes'
    VAxes: any[]; // Ajusta el tipo de los elementos del array según lo que representa 'VAxes'
    WAxes: any[]; // Ajusta el tipo de los elementos del array según lo que representa 'WAxes'
    type: number;
  }
  

  export interface IfcDistributionPort{
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según lo que representa 'OwnerHistory'
    Name: string;
    Description: string;
    ObjectType: string; // Ajusta el tipo si 'ObjectType' tiene un tipo específico
    ObjectPlacement: any; // Ajusta el tipo según lo que representa 'ObjectPlacement'
    Representation: any; // Ajusta el tipo según lo que representa 'Representation'
    FlowDirection: string; // Ajusta el tipo si 'FlowDirection' tiene un tipo específico, puede ser 'string' o un tipo enumerado
    type: number;
  }
  
  export interface IfcRelConnectsPortToElement {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según lo que representa 'OwnerHistory'
    Name: string;
    Description: string;
    RelatingPort: any; // Ajusta el tipo según lo que representa 'RelatingPort'
    RelatedElement: any; // Ajusta el tipo según lo que representa 'RelatedElement'
    type: number;
  }
  
  export interface IfcDistributionPort{
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según lo que representa 'OwnerHistory'
    Name: string;
    Description: string;
    ObjectType: string; // Ajusta el tipo según lo que representa 'ObjectType'
    ObjectPlacement: any; // Ajusta el tipo según lo que representa 'ObjectPlacement'
    Representation: any; // Ajusta el tipo según lo que representa 'Representation'
    FlowDirection: string; // Ajusta el tipo según lo que representa 'FlowDirection'
    type: number;
  }
  
  export interface IfcRelContainedInSpatialStructure {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según lo que representa 'OwnerHistory'
    Name: string;
    Description: string;
    RelatedElements: any[]; // Ajusta el tipo de los elementos según lo que representa 'RelatedElements'
    RelatingStructure: any; // Ajusta el tipo según lo que representa 'RelatingStructure'
    type: number;
  }
  
  export interface IfcRelDefinesByType  {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según lo que representa 'OwnerHistory'
    Name: string;
    Description: string;
    RelatedObjects: any[]; // Ajusta el tipo de los objetos según lo que representa 'RelatedObjects'
    RelatingType: any; // Ajusta el tipo según lo que representa 'RelatingType'
    type: number;
  }
  
  export interface IfcRelConnectsPathElements  {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según lo que representa 'OwnerHistory'
    Name: string;
    Description: string;
    ConnectionGeometry: any; // Ajusta el tipo según lo que representa 'ConnectionGeometry'
    RelatingElement: any; // Ajusta el tipo según lo que representa 'RelatingElement'
    RelatedElement: any; // Ajusta el tipo según lo que representa 'RelatedElement'
    RelatingPriorities: any; // Ajusta el tipo según lo que representa 'RelatingPriorities'
    RelatedPriorities: any; // Ajusta el tipo según lo que representa 'RelatedPriorities'
    RelatedConnectionType: any; // Ajusta el tipo según lo que
  }

  export interface IfcOpeningElement {
    GlobalId: string;
    OwnerHistory: any; // Ajusta el tipo según lo que representa 'OwnerHistory'
    Name: string;
    Description: string;
    ObjectType: string;
    ObjectPlacement: any; // Ajusta el tipo según lo que representa 'ObjectPlacement'
    Representation: any; // Ajusta el tipo según lo que representa 'Representation'
    Tag: string;
    type: number;
  }
  
  export interface IfcRelVoidsElement {
    GlobalId: string;
    OwnerHistory: any; // Ajustar el tipo según lo que representa 'OwnerHistory'
    Name: string;
    Description: string;
    RelatingBuildingElement: any; // Ajustar el tipo según lo que representa 'RelatingBuildingElement'
    RelatedOpeningElement: any; // Ajustar el tipo según lo que representa 'RelatedOpeningElement'
    type: number;
  }
  

  export interface IfcRelFillsElement{
    GlobalId: string;
    OwnerHistory: any; // Ajustar el tipo según lo que representa 'OwnerHistory'
    Name: string;
    Description: string;
    RelatingOpeningElement: any; // Ajustar el tipo según lo que representa 'RelatingOpeningElement'
    RelatedBuildingElement: any; // Ajustar el tipo según lo que representa 'RelatedBuildingElement'
    type: number;
  }
  