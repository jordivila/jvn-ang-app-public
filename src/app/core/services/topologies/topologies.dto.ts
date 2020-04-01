export interface Topologies {
    [name: string]: Topology;
}

interface Topology {
    [element: string]: ElecComponent;
}

interface ElecComponent {
    family: string | number;
    properties: Properties;
}

interface Properties {
    [property: string]: string;
}
