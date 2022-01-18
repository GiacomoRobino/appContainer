import { Component, ViewContainerRef, OnInit } from '@angular/core';
import {
  select,
  selectAll,
  forceSimulation,
  SimulationNodeDatum,
  SimulationLinkDatum,
  forceLink,
  forceManyBody,
  forceCenter,
  drag,
} from 'd3';
import { Node } from './node';

@Component({
  selector: 'app-json-to-graph',
  templateUrl: './json-to-graph.component.html',
  styleUrls: ['./json-to-graph.component.scss'],
})
export class JsonToGraphComponent implements OnInit {
  constructor(private viewContainerRef: ViewContainerRef) {}
  public simulation: any;
  public node: any;
  public link: any;
  public svg: any;

  public globalGraph: {
    nodes: SimulationNodeDatum[];
    links: SimulationLinkDatum<Node>[];
  } = { nodes: [], links: [] };

  public elem = this.viewContainerRef.element.nativeElement;
  public bob = new Node();
  public chen = new Node();
  public alice = new Node();
  public dawg = new Node();
  public globalGraph_: {
    nodes: SimulationNodeDatum[];
    links: SimulationLinkDatum<Node>[];
  } = {
    nodes: [this.alice, this.bob, this.chen, this.dawg],
    /*
    links: [
      { source:  this.alice, target: this.bob},
      { source: this.chen, target: this.bob},
      { source: this.chen, target: this.dawg}
    ]
    */
    links: [
      { source: this.dawg, target: this.bob },
      { source: this.dawg, target: this.alice },
      { source: this.dawg, target: this.chen },
    ],
  };

  ngOnInit(): void {
    this.svg = this.localSelector('svg');
    let width = this.svg.attr('width');
    let height = this.svg.attr('height');
    this.globalGraph = this.graphFromObject({ name: 'test', age: '12', height: 'tall', 
    sub: { name: 'test', age: '12', height: 'tall', sub: { name: 'test', age: '12'} }});
    console.log(this.globalGraph);

    this.simulation = forceSimulation(this.globalGraph.nodes);
    this.simulation
      .force(
        'link',
        forceLink()
          .id(function (d: any) {
            return d;
          })
          .links(this.globalGraph.links)
      )
      .force('charge', forceManyBody().strength(-10))
      .force('center', forceCenter(width / 2, height / 2))
      .on('tick', this.ticked.bind(this));

    this.link = this.svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(this.globalGraph.links)
      .enter()
      .append('line')
      .style('stroke', 'lightgreen')
      .attr('stroke-width', function (d: any) {
        return 3;
      });

    this.node = this.svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(this.globalGraph.nodes)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', function (d: any) {
        return 'blue';
      })
      .call(
        drag()
          .on('start', this.dragstarted.bind(this))
          .on('drag', this.dragged.bind(this))
          .on('end', this.dragended.bind(this))
      );
  }

  ticked() {
    this.link
      .attr('x1', function (d: any) {
        return d.source.x;
      })
      .attr('y1', function (d: any) {
        return d.source.y;
      })
      .attr('x2', function (d: any) {
        return d.target.x;
      })
      .attr('y2', function (d: any) {
        return d.target.y;
      });

    this.node
      .attr('cx', function (d: any) {
        return d.x;
      })
      .attr('cy', function (d: any) {
        return d.y;
      });
  }

  dragstarted(d: any) {
    if (!d.active) this.simulation.alphaTarget(0.3).restart();
    d.subject.fx = d.x;
    d.subject.fy = d.y;
  }

  dragged(d: any) {
    d.subject.fx = d.x;
    d.subject.fy = d.y;
  }

  dragended(d: any) {
    if (!d.active) this.simulation.alphaTarget(0);
    d.subject.fx = null;
    d.subject.fy = null;
  }

  localSelector(selector: string) {
    return select(this.elem).select(selector);
  }

  fill(l: any) {
    let divs = this.svg.selectAll('div').data(l);
    divs
      .enter()
      .append('div')
      .merge(divs)
      .text((d: string) => d);
    divs.exit().remove();
  }

  objectToGraph(obj: any) {
    this.initNodes(obj);

    //this.globalGraph.links.push({source: newNode, target: this.globalGraph.nodes[0]});

    //create the node data

    //create a node for each son

    //create links between the node and the sons
  }

  isBasic(obj: any) {
    return !(this.isObject(obj) || this.isArray(obj));
  }

  initNodes(obj: any) {
    let objectEntries = Object.entries(obj);
    //base case, there are no more sons that are arrays or objects
    if (!objectEntries.some(([key, value]) => this.isBasic(value))) {
    } else {
      let newNode = new Node();
      //recursive case, there are sons that are arrays or objects

      //add the basic type objects to the node
      let basicKeys = objectEntries.filter(([key, value]) =>
        this.isBasic(value)
      );
      newNode.body = { ...basicKeys.map(([k, v]) => ({ key: k, value: v }))};

      let newNodeEntries = Object.entries(newNode.body);
      let newNodeSons = newNodeEntries.map((value) => new Node(value));
      this.globalGraph.nodes = [
        ...this.globalGraph.nodes,
        ...newNodeSons,
        newNode,
      ];
      this.initLinks(newNode, newNodeSons);
    }
  }

  initLinks(parent: any, sons: any) {
    sons.forEach((son: any) => {
      this.globalGraph.links.push({ source: parent, target: son });
    });
  }

  getLinks(
    parent: any,
    sons: Node[]
  ): SimulationLinkDatum<Node>[] {
    let result: SimulationLinkDatum<Node>[] = [];
    sons.forEach((son: any) => {
      result.push({ source: parent, target: son });
    });
    return result;
  }

  graphFromObject(obj: any): {
    nodes: SimulationNodeDatum[];
    links: SimulationLinkDatum<Node>[];
  } {
    let objectEntries = Object.entries(obj);
    let result: {
      nodes: SimulationNodeDatum[];
      links: SimulationLinkDatum<Node>[];
    } = { nodes: [], links: [] };

    if (!objectEntries.some(([key, value]) => this.isBasic(value))) {
    //end of object exploration
    } 
    
    else {
      let newNode = new Node();

      //add the basic type objects to the node
      let basicKeys = objectEntries.filter(([key, value]) =>
        this.isBasic(value)
      );
      newNode.body = { ...basicKeys.map(([k, v]) => ({ key: k, value: v })) };

      let newNodeEntries = Object.entries(newNode.body);
      let newNodeSons = newNodeEntries.map((value) => new Node(value));
      result.nodes = [...result.nodes, ...newNodeSons, newNode];
      result.links = [...result.links, ...this.getLinks(newNode, newNodeSons)];

      //adding nested graphs

      let nestedObjects = objectEntries.filter(([key, value]) =>
      this.isObject(value)
    );
    let nestedGraphs = nestedObjects.map(([key, value]) =>
      this.graphFromObject(value)
    );

    nestedGraphs.forEach((graph: any) => {
      result.nodes = [...result.nodes, ...graph.nodes];
      result.links = [...result.links, ...graph.links, {source: newNode, target: this.getFirstNode(graph.links)}];
    });
    }
    return result;
  }

  getFirstNode(links: any) {
    return links.filter((link: any) => !links.some((secondLink: any) => secondLink.target === link.source))[0].source;
  }

  isObject(obj: any) {
    return typeof obj === 'object' && obj !== null;
  }

  isArray(obj: any) {
    return Array.isArray(obj);
  }
}
