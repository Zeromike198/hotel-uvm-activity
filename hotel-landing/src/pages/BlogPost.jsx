import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();

  return (
    <div>
      <h1>Artículo del Blog</h1>
      <p>Contenido del artículo con slug: {slug}</p>
      <div>
        <h2>Contenido del artículo:</h2>
        <p>Este es un artículo de ejemplo sobre nuestro hotel y servicios.</p>
        <p>Aquí encontrarás información detallada sobre nuestras instalaciones, servicios y experiencias únicas.</p>
      </div>
    </div>
  );
};

export default BlogPost;
