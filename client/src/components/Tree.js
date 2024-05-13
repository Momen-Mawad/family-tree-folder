import React, { useState } from 'react';
import Tree from "react-d3-tree";
import { useCenteredTree } from "./helpers";
import "./Tree.css";
import { load_tree } from '../actions/tree';
import { connect } from 'react-redux';
import './Tree.css';

const mapStateToProps = state => ({
  tree: state.tree
});

export function TreeGraph({tree}) {

  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => {
  return (
    <g>
      <circle r={5}></circle>
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject {...{ width: 50, height: 95, x: -27 , y: -25}}>
        <div style={{ border: "1px solid black", backgroundColor: "#dedede"}}>
            <img 
              src={`${process.env.REACT_APP_MEDIA_URL}${nodeDatum.img}.jpeg`}
              alt="No Image"
            />
            <button className="button" onClick={toggleNode}>
              {nodeDatum.name}
            </button>
        </div>
      </foreignObject>
    </g>
  )};

  const [translate, containerRef] = useCenteredTree();
  const containerStyles = {
    width: "100vw",
    height: "100vh"
  };

  const makeTree = (familyData) => {
    const nodeSize = { x: 100, y: 150 };
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
