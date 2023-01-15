import React, { useState, useEffect } from 'react';
import Tree from "react-d3-tree";
import { useCenteredTree } from "./helpers";
import "./Tree.css";
import Cookies from 'js-cookie';
import { load_tree } from '../actions/tree';
import { connect } from 'react-redux';
import orgChartJson from '../data'

const mapStateToProps = state => ({
  tree: state.tree
});

export function TreeGraph({tree}) {

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps
  }) => (
    <g>
      <circle r={15}></circle>
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject {...foreignObjectProps}>
        <div style={{ border: "1px solid black", backgroundColor: "#dedede" }}>
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
          {nodeDatum.children && (
            <button style={{ width: "100%" }} onClick={toggleNode}>
              {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
            </button>
          )}
        </div>
      </foreignObject>
    </g>
  );

  const makeTree = (familyData, foreignObjectProps) => {
    return (
    <Tree
      data={familyData}
      translate={translate}
      nodeSize={nodeSize}
      renderCustomNodeElement={(rd3tProps) =>
        renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
      }
      pathFunc="step"
      initialDepth="1"
      orientation="vertical"
    />
    )
  };

  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 100, y: 100 };
  const containerStyles = {
    width: "100vw",
    height: "100vh"
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
