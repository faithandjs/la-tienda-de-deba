import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import '../styles/global.scss';
import '../styles/index.scss';
import gsap from 'gsap';
import { Link } from 'gatsby';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useStoreContext from '@/context/context';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Amount from '@/components/Amount';
import Sale from '@/components/sale';
export default function Home(query: any) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  // gsap.registerPlugin(ScrollTrigger);
  const image = getImage(query.data.file);
  const { handle, media, tags, title, priceRangeV2 } =
    query.data.shopifyProduct;
  const data = query.data.allShopifyProduct.edges;
  const { passed } = useStoreContext();
  const monthConverter = (num: number) => {
    switch (num) {
      case 0:
        return 'January';
      case 1:
        return 'Feburary';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        return 'January';
        break;
    }
  };
  const countdown = () => {
    const today = new Date();
    let month;
    let year = today.getFullYear();
    if (today.getMonth() < 6 || today.getMonth() === 11) {
      month = monthConverter(6);
      if (today.getMonth() === 11) year = year + 1;
    }
    if (today.getMonth() >= 6 && today.getMonth() !== 11) {
      month = monthConverter(11);
    }
    const salesDate = new Date(`${month} 1, ${year} 00:00:00`);
    const diff = salesDate.getTime() - today.getTime();

    const ddays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const dhours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    ddays !== days && setDays(ddays);
    dhours !== hours && setHours(dhours);
    minutes !== mins && setMins(minutes);
    seconds !== secs && setSecs(seconds);
  };
  useEffect(() => {
    console.log(data);
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
    setInterval(countdown, 2500);
    passed.current = true;
  });

  const addDigit = (num: number) => {
    if (num.toString().length === 1) return `0` + num;
    return num;
  };
  return (
    <Layout page="home">
      <>
        <section className="banner">
          <div className="img-box">
            {image !== undefined && (
              <GatsbyImage
                image={image}
                alt="banner: models by a window in a storey building in black and white"
              />
            )}
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
        <section className="best">
          <h2>Best seller of the week</h2>
          <div className="best-details">
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
        <Sale />
        <section className="on-sale">
          <div className="header">
            <h2>On Sale</h2>
            <ul>
              <li>
                <div className="text">days</div>
                <div className="det">{addDigit(days)}</div>
              </li>
              <li>
                <div className="text">hours</div>
                <div className="det">{addDigit(hours)}</div>
              </li>
              <li>
                <div className="text">minutes</div>
                <div className="det">{addDigit(mins)}</div>
              </li>
              <li>
                <div className="text">seconds</div>
                <div className="det">{addDigit(secs)}</div>
              </li>
            </ul>
          </div>
          <div className="section">
            {data.map((item: any, index: number) => {
              const { featuredImage, priceRangeV2, title, handle } = item.node;
              const amount = priceRangeV2.maxVariantPrice.amount;
              if (
                title === 'balenciaga hourglass crocodile embossed' ||
                title === 'Dior my ABCDIOR bag' ||
                title === 'LV Alma BB Bag' ||
                title === 'LV Over The Moon Bag' ||
                title === 'NÉONOÉ BB' ||
                title === 'SPEEDY BANDOULIÈRE 20'
              ) {
                return (
                  <div className="na-box">
                    <div className="img-box">
                      <img src={featuredImage.src} alt={`image of ${title}`} />
                    </div>
                    <div className="details">
                      <Link to={`/products/${handle}`}>
                        <h4>{title}</h4>
                      </Link>
                      <div className="amounts">
                        <Amount amount={amount} />
                        <Amount amount={amount - amount * 0.3} />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </section>
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
    allShopifyProduct(filter: { tags: { eq: "bag" } }) {
      edges {
        node {
          featuredImage {
            src
          }
          title
          handle
          priceRangeV2 {
            maxVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`;
