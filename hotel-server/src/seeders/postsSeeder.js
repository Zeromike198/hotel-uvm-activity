const Post = require('../models/Post');

/**
 * Seeder para crear artículos de blog por defecto
 */
const seedPosts = async () => {
  try {
    // Verificar si ya existen posts
    const existingPosts = await Post.countDocuments();
    
    if (existingPosts > 0) {
      console.log('✅ Artículos de blog ya existen');
      return;
    }

    const postsData = [
      {
        title: 'Descubre los Mejores Lugares Turísticos de Mérida',
        slug: 'mejores-lugares-turisticos-merida',
        content: `
          <h2>Explora la Ciudad Blanca</h2>
          <p>Mérida, conocida como la "Ciudad Blanca", es uno de los destinos más fascinantes de México. Con su rica historia maya, arquitectura colonial y cultura vibrante, ofrece experiencias únicas para todos los visitantes.</p>
          
          <h3>Lugares Imperdibles</h3>
          <ul>
            <li><strong>Chichén Itzá:</strong> Una de las 7 Maravillas del Mundo Moderno</li>
            <li><strong>Uxmal:</strong> Ciudad maya con arquitectura Puuc impresionante</li>
            <li><strong>Cenotes:</strong> Pozas naturales de agua cristalina</li>
            <li><strong>Centro Histórico:</strong> Arquitectura colonial y vida nocturna</li>
          </ul>
          
          <h3>Consejos para tu Visita</h3>
          <p>Para aprovechar al máximo tu estadía en Mérida, te recomendamos:</p>
          <ul>
            <li>Visitar durante la temporada seca (noviembre a abril)</li>
            <li>Llevar ropa cómoda y protector solar</li>
            <li>Probar la gastronomía local en los mercados tradicionales</li>
            <li>Reservar tours guiados para los sitios arqueológicos</li>
          </ul>
          
          <p>En Hotel Paradise Mérida, te ayudamos a planificar tu aventura yucateca con la mejor ubicación y servicios de primera clase.</p>
        `,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            alt: 'Chichén Itzá al amanecer',
            caption: 'Chichén Itzá, una de las 7 Maravillas del Mundo'
          },
          {
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            alt: 'Cenote en Yucatán',
            caption: 'Cenotes de agua cristalina únicos en el mundo'
          }
        ],
        status: 'published',
        author: 'Admin',
        tags: ['turismo', 'mérida', 'yucatán', 'chichén itzá', 'cenotes'],
        excerpt: 'Descubre los lugares más fascinantes de Mérida, desde Chichén Itzá hasta los cenotes, y planifica tu aventura yucateca con nuestros consejos expertos.',
        featured: true,
        views: 0
      },
      {
        title: 'Gastronomía Yucateca: Sabores que Debes Probar',
        slug: 'gastronomia-yucateca-sabores-probar',
        content: `
          <h2>Una Aventura Culinaria Única</h2>
          <p>La gastronomía yucateca es una fusión fascinante de tradiciones mayas, españolas y caribeñas. Cada platillo cuenta una historia y representa la rica cultura de la región.</p>
          
          <h3>Platillos Imperdibles</h3>
          <ul>
            <li><strong>Cochinita Pibil:</strong> Cerdo marinado en achiote y cocido en hoja de plátano</li>
            <li><strong>Poc Chuc:</strong> Carne de cerdo asada con cebolla morada</li>
            <li><strong>Panuchos:</strong> Tortillas rellenas de frijol con lechuga, tomate y pavo</li>
            <li><strong>Salbutes:</strong> Tortillas fritas con pollo desmenuzado</li>
            <li><strong>Queso Relleno:</strong> Queso Edam relleno de carne molida</li>
          </ul>
          
          <h3>Bebidas Tradicionales</h3>
          <ul>
            <li><strong>Agua de Chaya:</strong> Refrescante bebida con hierbas locales</li>
            <li><strong>Horchata:</strong> Bebida de arroz con canela</li>
            <li><strong>Xtabentún:</strong> Licor de miel de abeja con anís</li>
          </ul>
          
          <h3>Dónde Probar</h3>
          <p>En Hotel Paradise Mérida, nuestro restaurante ofrece una selección cuidadosa de los mejores platillos yucatecos, preparados con ingredientes frescos y técnicas tradicionales.</p>
        `,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            alt: 'Gastronomía Yucateca tradicional',
            caption: 'Platillos típicos de la gastronomía yucateca'
          }
        ],
        status: 'published',
        author: 'Admin',
        tags: ['gastronomía', 'yucatán', 'comida', 'tradición', 'cultura'],
        excerpt: 'Descubre los sabores únicos de la gastronomía yucateca, desde la cochinita pibil hasta las bebidas tradicionales, en una aventura culinaria inolvidable.',
        featured: true,
        views: 0
      },
      {
        title: 'Cenotes de Yucatán: Maravillas Naturales Subterráneas',
        slug: 'cenotes-yucatan-maravillas-naturales',
        content: `
          <h2>Un Mundo Subterráneo Mágico</h2>
          <p>Los cenotes son pozas naturales de agua dulce que se formaron hace millones de años. Para los mayas, eran sagrados y representaban la entrada al inframundo. Hoy, son uno de los atractivos más fascinantes de Yucatán.</p>
          
          <h3>Tipos de Cenotes</h3>
          <ul>
            <li><strong>Cenotes Abiertos:</strong> Como pozas naturales al aire libre</li>
            <li><strong>Cenotes Semiabiertos:</strong> Con aberturas parciales en el techo</li>
            <li><strong>Cenotes Cerrados:</strong> Completamente subterráneos</li>
          </ul>
          
          <h3>Cenotes Recomendados</h3>
          <ul>
            <li><strong>Ik Kil:</strong> Cerca de Chichén Itzá, perfecto para nadar</li>
            <li><strong>Dzitnup:</strong> Cenote cerrado con estalactitas impresionantes</li>
            <li><strong>Xkeken:</strong> Hermoso cenote con aguas cristalinas</li>
            <li><strong>Suytun:</strong> Cenote con plataforma circular para fotos</li>
          </ul>
          
          <h3>Consejos para tu Visita</h3>
          <ul>
            <li>Lleva traje de baño y toalla</li>
            <li>Usa protector solar biodegradable</li>
            <li>Respeta las reglas del lugar</li>
            <li>No uses bronceador antes de entrar</li>
            <li>Disfruta la experiencia con responsabilidad</li>
          </ul>
          
          <p>Desde Hotel Paradise Mérida, organizamos tours a los cenotes más hermosos de la región, con transporte incluido y guías expertos.</p>
        `,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            alt: 'Cenote Ik Kil',
            caption: 'Cenote Ik Kil, uno de los más famosos de Yucatán'
          }
        ],
        status: 'published',
        author: 'Admin',
        tags: ['cenotes', 'naturaleza', 'yucatán', 'agua', 'aventura'],
        excerpt: 'Explora los cenotes de Yucatán, maravillas naturales subterráneas que ofrecen experiencias únicas de natación y buceo en aguas cristalinas.',
        featured: false,
        views: 0
      },
      {
        title: 'Historia y Cultura Maya en Mérida',
        slug: 'historia-cultura-maya-merida',
        content: `
          <h2>El Legado Maya en la Ciudad Blanca</h2>
          <p>Mérida se construye sobre los cimientos de la antigua ciudad maya de T'ho. La influencia maya sigue presente en la cultura, tradiciones y vida cotidiana de la ciudad.</p>
          
          <h3>Sitios Arqueológicos Cercanos</h3>
          <ul>
            <li><strong>Dzibilchaltún:</strong> "Lugar donde hay escritura en piedras"</li>
            <li><strong>Mayapán:</strong> Última capital maya antes de la conquista</li>
            <li><strong>Acanceh:</strong> Sitio con influencias teotihuacanas</li>
          </ul>
          
          <h3>Tradiciones Vivas</h3>
          <ul>
            <li><strong>Hanal Pixán:</strong> Día de Muertos maya</li>
            <li><strong>Vaquería:</strong> Fiesta tradicional con jarana</li>
            <li><strong>Ceremonia del Ch'a Chaak:</strong> Ritual para pedir lluvia</li>
          </ul>
          
          <h3>Artesanías Mayas</h3>
          <p>La artesanía maya sigue siendo una expresión viva de la cultura:</p>
          <ul>
            <li>Hamacas de henequén</li>
            <li>Bordados tradicionales</li>
            <li>Cerámica maya</li>
            <li>Joyería de coral y concha</li>
          </ul>
          
          <p>En Hotel Paradise Mérida, te conectamos con la cultura maya a través de tours culturales y experiencias auténticas que te permitirán conocer las tradiciones vivas de esta fascinante civilización.</p>
        `,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            alt: 'Templo maya en Yucatán',
            caption: 'Arquitectura maya que perdura hasta nuestros días'
          }
        ],
        status: 'published',
        author: 'Admin',
        tags: ['maya', 'historia', 'cultura', 'tradición', 'mérida'],
        excerpt: 'Sumérgete en la rica historia y cultura maya que sigue viva en Mérida, desde sitios arqueológicos hasta tradiciones contemporáneas.',
        featured: false,
        views: 0
      },
      {
        title: 'Mejor Época para Visitar Mérida',
        slug: 'mejor-epoca-visitar-merida',
        content: `
          <h2>Planifica tu Viaje Perfecto</h2>
          <p>Mérida tiene un clima tropical que varía a lo largo del año. Conocer las mejores épocas te ayudará a disfrutar al máximo tu experiencia en la Ciudad Blanca.</p>
          
          <h3>Temporada Seca (Noviembre - Abril)</h3>
          <p><strong>Mejor época para visitar</strong></p>
          <ul>
            <li>Temperaturas agradables (25-30°C)</li>
            <li>Poca lluvia</li>
            <li>Días soleados perfectos para tours</li>
            <li>Ideal para visitar cenotes y sitios arqueológicos</li>
          </ul>
          
          <h3>Temporada de Lluvias (Mayo - Octubre)</h3>
          <ul>
            <li>Lluvias tropicales intensas pero breves</li>
            <li>Temperaturas más altas (30-35°C)</li>
            <li>Precios más bajos en hoteles</li>
            <li>Menos turistas</li>
          </ul>
          
          <h3>Eventos Especiales</h3>
          <ul>
            <li><strong>Enero:</strong> Festival de la Ciudad</li>
            <li><strong>Febrero:</strong> Carnaval de Mérida</li>
            <li><strong>Noviembre:</strong> Hanal Pixán (Día de Muertos)</li>
            <li><strong>Diciembre:</strong> Feria de Navidad</li>
          </ul>
          
          <h3>Consejos por Temporada</h3>
          <p><strong>En temporada seca:</strong> Reserva con anticipación, lleva protector solar y ropa ligera.</p>
          <p><strong>En temporada de lluvias:</strong> Lleva paraguas, ropa que seque rápido y aprovecha los precios bajos.</p>
          
          <p>En Hotel Paradise Mérida, te ayudamos a planificar tu visita según la época del año, ofreciendo paquetes especiales y recomendaciones personalizadas.</p>
        `,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            alt: 'Mérida en temporada seca',
            caption: 'Mérida durante la temporada seca, ideal para turismo'
          }
        ],
        status: 'published',
        author: 'Admin',
        tags: ['clima', 'temporada', 'mérida', 'turismo', 'planificación'],
        excerpt: 'Descubre la mejor época para visitar Mérida, con consejos sobre clima, eventos especiales y recomendaciones para cada temporada del año.',
        featured: false,
        views: 0
      }
    ];

    // Crear los posts
    for (const postData of postsData) {
      const post = new Post(postData);
      await post.save();
      console.log(`✅ Artículo creado: ${post.title}`);
    }

    console.log('✅ Seeder de artículos completado exitosamente');
    console.log(`📝 Total de artículos creados: ${postsData.length}`);
    
  } catch (error) {
    console.error('❌ Error al crear artículos:', error);
    throw error;
  }
};

/**
 * Seeder para limpiar y recrear los posts (útil para desarrollo)
 */
const resetPosts = async () => {
  try {
    // Eliminar todos los posts
    await Post.deleteMany({});
    console.log('🗑️  Artículos eliminados');
    
    // Crear nuevos posts
    await seedPosts();
    
  } catch (error) {
    console.error('❌ Error al resetear artículos:', error);
    throw error;
  }
};

module.exports = {
  seedPosts,
  resetPosts
};
