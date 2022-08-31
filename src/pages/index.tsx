import Layout from '@/components/Layout';
import { useEffect } from 'react';
import '../styles/global.scss';
import '../styles/banner.scss';
import '../styles/iotd.scss';
import gsap from 'gsap';
import { Link } from 'gatsby';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useStoreContext from '@/context/context';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Amount from '@/components/Amount';

export default function Home(query: any) {
  // gsap.registerPlugin(ScrollTrigger);
  const image = getImage(query.data.file);
  const { handle, media, tags, title, priceRangeV2 } =
    query.data.shopifyProduct;
  const { passed } = useStoreContext();
  useEffect(() => {
    console.log(handle, media, tags, title);
    document.querySelector('.banner text')
      ? (document.querySelector('.banner text')!.textContent =
          'we love designers!')
      : null;
    document.querySelector('.WLD .upper')
      ? (document.querySelector('.WLD .upper')!.textContent = 'we love ')
      : null;
    document.querySelector('.WLD .lower')
      ? (document.querySelector('.WLD .lower')!.textContent = 'designers!')
      : null;

    const banner = gsap.timeline({ delay: 0.7 });
    const banner1 = gsap.timeline();
    if (!passed.current) {
      banner.fromTo(
        '.banner text',
        {
          strokeDasharray: 900,
          strokeDashoffset: 900,
          fill: 'transparent',
          opacity: 0.7,
        },
        {
          strokeDashoffset: 0,
          duration: 2.5,
          opacity: 1,
          fill: 'rgba(255, 255, 255, 0.267)',
        },
      );
      banner1
        .from('.WLD .upper ', { duration: 0.75, yPercent: 100 }, '<1')
        .from('.WLD .lower', { duration: 0.75, yPercent: -100 }, '<0')
        .to(' .WLD .upper, .WLD .lower', {
          duration: 1,
          ease: 'none',
          yPercent: 0,
        });
    }
    passed.current = true;
  });

  return (
    <Layout page="home">
      <>
        <section className="banner">
          <div className="img-box">
            {image !== undefined && (
              <GatsbyImage image={image} alt="banner: designer bag" />
            )}
            {/* <img src={tower} alt="" /> */}
          </div>
          <div className="text">
            <svg>
              <text x="0" y="100"></text>
            </svg>
            <div className="WLD">
              <div className="upper-box">
                <div className="upper"></div>
              </div>
              <div className="lower-box">
                <div className="lower"></div>
              </div>
            </div>
          </div>
        </section>
        <section className="iotd">
          <h2>Item of the Day</h2>
          <div className="iotd-details">
            <div className={`img-box image0`}>
              <img
                src={media[0].preview.image.src}
                alt={`another image of ${title}`}
              />
            </div>
            <div className="details-box">
              <div className="details">
                <h3>
                  <Link to={`/products/${handle}`}> {title} </Link>
                </h3>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Omnis ratione totam, nisi saepe nam ut. Dolor quam iusto
                </p>
                <Amount amount={priceRangeV2.maxVariantPrice.amount} />
              </div>
            </div>
            <div className="images">
              <div className={`img-box`}>
                <img
                  src={media[1].preview.image.src}
                  alt={`another image of ${title}`}
                />
              </div>
              <div className={`img-box`}>
                <img
                  src={media[2].preview.image.src}
                  alt={`another image of ${title}`}
                />
              </div>
            </div>{' '}
          </div>
        </section>
        {/* <section className="new-arrivals">
          <h2>New Arrivals</h2>
        </section> */}
      </>
    </Layout>
  );
}
export const pageQuery = graphql`
  query Banner {
    file(relativePath: { eq: "clem-onojeghuo-HpEDSZukJqk-unsplash.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR)
      }
    }
    shopifyProduct(title: { eq: "Medusa Aevitas platform pumps" }) {
      title
      handle
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
        }
      }
      media {
        preview {
          image {
            src
          }
        }
      }
    }
  }
`;
