import React, { useState, useEffect } from 'react';
import Tree from "react-d3-tree";
import { useCenteredTree } from "./helpers";
import "./Tree.css";


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
    <circle r={5}></circle>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
      <div>
        {nodeDatum.children && (
          <button style={{ width: "100%" }} onClick={toggleNode}>
            <h3>
              {nodeDatum.__rd3t.collapsed ? nodeDatum.name : nodeDatum.name}
            </h3>
          </button>
        )}
      </div>
    </foreignObject>
  </g>
);

export default function App() {
  const [data, setData ] = useState({});

  useEffect(() => {
  async function fetchData() {
    const response = await fetch('http://127.0.0.1:8000/person/', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json();
    setData(result);
    }
    fetchData()
  },
  []
  );
  console.log(data);

  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 200, y: 200 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -100 };
  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={data}
        translate={translate}
        nodeSize={nodeSize}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
        orientation="vertical"
      />
    </div>
  );
}
