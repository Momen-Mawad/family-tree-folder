import React, { useState } from 'react';
import Tree from "react-d3-tree";
import { useCenteredTree } from "./helpers";
import "./Tree.css";
import { load_tree } from '../actions/tree';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  tree: state.tree
});

export function TreeGraph({tree}) {

  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle r={5}></circle>
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject {...{ width: 50, height: 110, x: -27 , y: -40}}>
        <div style={{ border: "1px solid black", backgroundColor: "#dedede"}}>
            <img src="http://family-tree.me:8181/media/Momen_109.jpeg" width="50" height="110"/>
            <button style={{ fontSize: "10px",  width: "100%" }} onClick={toggleNode}>
              {nodeDatum.name}
            </button>
        </div>
      </foreignObject>
    </g>
  );

  const [translate, containerRef] = useCenteredTree();
  const containerStyles = {
    width: "100vw",
    height: "100vh"
  };

  const makeTree = (familyData) => {
    const nodeSize = { x: 100, y: 100 };
    console.log(familyData);

  return (
    <Tree
      data={familyData}
      translate={translate}
      nodeSize={nodeSize}
      renderCustomNodeElement={renderRectSvgNode}
      pathFunc="step"
      initialDepth="1"
      orientation="vertical"
    />
    )
  };

  return (
    <div dir="ltr" style={containerStyles} ref={containerRef}>
      { typeof  tree.payload !== 'undefined' && tree.payload.length > 0
      ? makeTree(tree.payload)
      : makeTree({}) }
    </div>
  );
}


export default connect(mapStateToProps)(TreeGraph);
