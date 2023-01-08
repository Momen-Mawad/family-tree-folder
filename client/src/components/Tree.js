import React, { useState, useEffect } from 'react';
import Tree from "react-d3-tree";
import { useCenteredTree } from "./helpers";
import "./Tree.css";
import Cookies from 'js-cookie';
import { load_tree } from '../actions/tree';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  tree: state.tree
});

const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g>
    <rect width="20" height="20" x="-10" onClick={toggleNode} />
    <text fill="black" strokeWidth="1" x="20">
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.department && (
      <text fill="black" x="20" dy="20" strokeWidth="1">
        Department: {nodeDatum.attributes?.department}
      </text>
    )}
  </g>
);


export function TreeGraph({tree}) {

  const containerStyles = {
    width: "100vw",
    height: "100vh"
  };

  // Here we're using `renderCustomNodeElement` render a component that uses
  // both SVG and HTML tags side-by-side.
  // This is made possible by `foreignObject`, which wraps the HTML tags to
  // allow for them to be injected into the SVG namespace.
  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps
  }) => (
    <g>
      <circle r={20}></circle>
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject {...foreignObjectProps}>
        <div>
          {nodeDatum.children && (
            <button style={{ width: "100%" }} onClick={toggleNode}>
                {nodeDatum.name}
            </button>
          )}
        </div>
      </foreignObject>
    </g>
  );


  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 200, y: 200 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -100 };

  const makeTree = (familyData, CustomNodeElementFunction) => {
    console.log(nodeSize);
    return (
    <Tree
      data={familyData}
      translate={translate}
      nodeSize={{ x: 200, y: 200 }}
      renderCustomNodeElement={CustomNodeElementFunction}
      pathFunc="step"
      initialDepth="1"
      orientation="vertical"
    />
  );}

  return (

    <div dir="ltr" style={containerStyles} ref={containerRef}>
      { typeof  tree.payload !== 'undefined' && tree.payload.length > 0
      ? makeTree(tree.payload, renderRectSvgNode)
      : makeTree({}, renderRectSvgNode) }
    </div>
  );
}


export default connect(mapStateToProps)(TreeGraph);
