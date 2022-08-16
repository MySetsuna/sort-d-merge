import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Button, Image, Spin } from 'antd';

export default function LineBarChart() {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const chartInstanceRef = useRef();
  const chartInstanceRef2 = useRef();
  const [imageData, setImageData] = useState();

  const [maxWidth, setMaxWith] = useState(400);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chartInstanceRef.current = echarts.init(chartRef.current);
    chartInstanceRef2.current = echarts.init(chartRef2.current);
    const option = {
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      dataZoom: [{ maxValueSpan: 2 }],
      legend: {
        data: [
          '3-11岁任务数',
          '3-11岁全程接种量',
          '60岁任务数',
          '60岁全程接种量',
          '80岁任务数',
          '80岁全程接种量',
          '完成率',
        ],
      },
      xAxis: {
        type: 'category',
        data: ['街道1', '街道2', '街道3', '街道4', '街道5', '街道6', '街道7'],
      },
      yAxis: [
        { type: 'value' },
        {
          type: 'value',
          name: '%',
          nameTextStyle: {
            color: '#ccc',
            padding: [0, 0, 10, -30],
          },
          splitNumber: 5,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              width: 1,
              color: ['#ccc', '#ccc'],
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12,
            },
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        textStyle: {
          color: '#fff',
          align: 'left',
          fontSize: 14,
        },
        backgroundColor: 'rgba(0,0,0,0.8)',
      },
      series: [
        {
          name: '3-11岁任务数',
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'bar',
          stack: '5',
        },
        {
          name: '3-11岁全程接种量',
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'bar',
          stack: '5',
        },
        {
          name: '60岁任务数',
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'bar',
        },
        {
          name: '60岁全程接种量',
          data: [880, 30, 124, 118, 35, 47, 160],
          type: 'bar',
        },
        {
          name: '80岁任务数',
          data: [660, 30, 124, 118, 35, 47, 160],
          type: 'bar',
        },
        {
          name: '80岁全程接种量',
          data: [880, 30, 124, 118, 35, 47, 160],
          type: 'bar',
        },
        {
          name: '完成率',
          data: [50, 130, 124, 18, 35, 47, 160],
          yAxisIndex: 1,
          type: 'line',
          smooth: true,
        },
      ],
    };

    chartInstanceRef.current.setOption(option);
    option.series = [
      {
        name: '80岁全程接种量',
        data: [880, 30, 124, 118, 35, 47, 160],
        type: 'pie',
      },
    ];
    option.dataZoom = undefined;
    chartInstanceRef2.current.setOption(option);
    echarts.connect([chartInstanceRef.current, chartInstanceRef2.current]);
  }, []);

  const hendleDownLoad = async () => {
    setLoading(true);
    let imageUrl;
    const options = chartInstanceRef.current.getOption();
    chartInstanceRef.current.setOption({
      animation: false,
      dataZoom: [{ show: false, minSpan: 100 }],
    });
    setMaxWith(1500);

    setTimeout(async () => {
      chartInstanceRef.current.resize();

      chartInstanceRef2.current.resize();
      imageUrl = chartInstanceRef.current.getConnectedDataURL({ type: 'png' });
      setImageData(imageUrl);

      chartInstanceRef.current.setOption(
        { ...options, animation: false },
        true
      );
      setTimeout(() => {
        setMaxWith(400);
        setTimeout(() => {
          chartInstanceRef.current.resize();
          chartInstanceRef2.current.resize();
          chartInstanceRef.current.setOption({ ...options, animation: true });
          setLoading(false);
        });
      }, 200);
    });
    const flieoptions = {
      types: [
        {
          description: 'Image Files',
          accept: {
            'image/png': ['.png'],
          },
        },
      ],
    };
    const fileHandle = await window.showSaveFilePicker(flieoptions);
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    const response = await fetch(imageUrl);

    // Close the file and write the contents to disk.
    await response.body.pipeTo(writable);

    const data = await fetch(imageUrl);
    const blob = await data.blob();
    await navigator.clipboard.write([
      // eslint-disable-next-line no-undef
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
  };

  return (
    <>
      <Spin spinning={loading}>
        <div style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>React Echarts 折线+柱状图</h2>
            <div ref={chartRef} style={{ height: 400, width: maxWidth }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2>React Echarts 柄图</h2>
            <div ref={chartRef2} style={{ height: 400, width: maxWidth }} />
          </div>
        </div>
      </Spin>{' '}
      {`${loading}------------`}
      <Button type="primary" onClick={() => hendleDownLoad()}>
        1111111111111
      </Button>
      <Image src={imageData} />
    </>
  );
}

