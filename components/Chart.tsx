import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function Chart(props: any) {
  const [xData, setXData] = React.useState<any>([]);
  const [yData, setYData] = React.useState<any>([]);
  const [dataLoaded, setLoaded] = React.useState(false);
  const svgRef = useRef();

  useEffect(() => {
    if (props.transactions !== undefined) {
      const xDataPool: any[] = [];
      const yDataPool: any[] = [];
      props.transactions.forEach((txn: any) => {
        xDataPool.push({ timeStamp: txn.timestamp });
        yDataPool.push({ amount: txn.amount });
      });
      setXData(xDataPool);
      setYData(yDataPool);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      const w = 400;
      const h = 200;
      const svg = d3
        .select(svgRef.current)
        .attr('width', w)
        .attr('height', h)
        .style('background', '#fafafa')
        .style('border', '1px solid #ccc');

      const xScale = d3
        .scaleTime()
        .domain([0, xData.length - 1])
        .range([0, w]);
      const yScale = d3
        .scaleTime()
        .domain([0, yData.length - 1])
        .range([0, h]);
      const generateScaledLine = d3
        .line()
        .x((d: any, i: any) => xScale(i))
        .y(yScale)
        .curve(d3.curveCardinal);

      svg
        .selectAll('.line')
        .data([yData])
        .join('path')
        .attr('d', (d: any) => generateScaledLine(d))
        .attr('stroke', '#000')
        .attr('fill', 'none');
    }
  }, [dataLoaded]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
