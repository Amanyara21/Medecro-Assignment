import React from 'react';
import Svg, { Circle, Text as SvgText, Line } from 'react-native-svg';

const TeethView = ({ teethStatus, handleToothPress }) => {


  // Ellipse Shape for Jaw Shaped Diagram
  const renderTeeth = (start, end, radiusX, radiusY, offsetY, isLower) => {
    const teeth = [];
    const angleStep = Math.PI / (end - start);
    const spacingFactor = 1.6;

    const textRadiusX = radiusX - 20;
    const textRadiusY = radiusY - 20;

    for (let i = start; i <= end; i++) {
      const angle = (i - start) * angleStep + (isLower ? 0 : Math.PI);

      const x = 300 + radiusX * Math.cos(angle) * spacingFactor;
      const y = 150 + radiusY * Math.sin(angle) * spacingFactor + offsetY;

      const textX = 300 + textRadiusX * Math.cos(angle) * spacingFactor;
      const textY = 150 + textRadiusY * Math.sin(angle) * spacingFactor + offsetY;

      teeth.push(
        <Svg key={`tooth-${i}`} overflow="visible">
          {/* Circle to Show Each Tooth */}
          <Circle
            cx={x}
            cy={y}
            r={16}
            fill={teethStatus[i] || '#fff'}
            stroke="#000"
            strokeWidth={1}
            onPressIn={() => handleToothPress(i)}
          />
          <SvgText
            x={textX}
            y={textY}
            fontSize="14"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="#000"
            onPressIn={() => handleToothPress(i)}
          >
            {i}
          </SvgText>
        </Svg>
      );
    }
    return teeth;
  };

  return (
    <Svg height="600" width="600">
      { /* Vertical and Horizontal Line */}
      <Line x1="300" y1="150" x2="300" y2="450" stroke="#000" strokeWidth={1} />
      <Line x1="150" y1="300" x2="450" y2="300" stroke="#000" strokeWidth={1} />

      <SvgText
        x="300"
        y="120"
        fontSize="16"
        textAnchor="middle"
        fill="#000"
      >
        Upper Teeth
      </SvgText>

      <SvgText
        x="300"
        y="480"
        fontSize="16"
        textAnchor="middle"
        fill="#000"
      >
        Lower Teeth
      </SvgText>

      {renderTeeth(1, 16, 100, 130, 200, true)}
      {renderTeeth(17, 32, 100, 130, 100, false)}
    </Svg>
  );
};

export default TeethView;
