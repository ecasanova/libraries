// Bandera de España (SVG detallada)
export const FlagES = () => (
  <svg width="24" height="24" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#AA151B"/>
    <rect y="10" width="60" height="20" fill="#F1BF00"/>
    {/* Escudo simplificado */}
    <g>
      <ellipse cx="15" cy="20" rx="3" ry="5" fill="#fff" stroke="#AA151B" strokeWidth="0.7"/>
      <rect x="13.5" y="17" width="3" height="6" fill="#F1BF00" stroke="#AA151B" strokeWidth="0.5"/>
      <circle cx="15" cy="20" r="1.2" fill="#AA151B"/>
    </g>
  </svg>
);

// Bandera de EEUU (SVG detallada)
export const FlagUS = () => (
  <svg width="24" height="24" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#B22234"/>
    {[...Array(6)].map((_, i) => (
      <rect key={i} y={i * 6.67 + 3.33} width="60" height="3.33" fill="#fff"/>
    ))}
    <rect width="24" height="20" fill="#3C3B6E"/>
    {/* Estrellas */}
    <g fill="#fff">
      {[...Array(9)].map((_, row) =>
        [...Array(row % 2 === 0 ? 6 : 5)].map((_, col) => (
          <circle
            key={row + '-' + col}
            cx={3 + col * 4 + (row % 2 === 0 ? 0 : 2)}
            cy={3 + row * 2.2}
            r="0.9"
          />
        ))
      )}
    </g>
  </svg>
);
