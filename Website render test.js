// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;
const UI = importModule("ui");
const ui = new UI();

const data = {
  html: {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        fontFamily: "-apple-system",
      }
    },
    children: [
      {
        type: "div",
        props: {
          innerText: "Welcome back, Olivia 👋",
          style: {
            fontSize: "24px",
            fontWeight: "bold",
          }
        }
      },
      {
        type: "div",
        props: {
          style: {
            backgroundColor: "#c1e2c3",
            padding: "16px",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }
            },
            children: [
              {
                type: "div",
                props: {
                  innerText: "Retinol Youth Renewal\nNight Cream",
                  style: {
                    fontWeight: "bold",
                    fontSize: "16px",
                  }
                }
              },
              {
                type: "div",
                props: {
                  innerText: "Retinol Tri-Active Technology helps fight the appearance of wrinkles.",
                  style: {
                    fontSize: "13px",
                  }
                }
              },
              {
                type: "div",
                props: {
                  innerText: "20% OFF | BUY NOW",
                  style: {
                    backgroundColor: "#000",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    width: "fit-content"
                  }
                }
              }
            ]
          },
          {
            type: "img",
            props: {
              src: "https://plus.unsplash.com/premium_photo-1661769021743-7139c6fc4ab9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXR5JTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
              style: {
                width: "80px",
                height: "80px",
                borderRadius: "10px",
              }
            }
          }
        ]
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            gap: "8px",
            marginBottom: "10px",
            overflowX: "auto",
          }
        },
        children: ["Fragrance", "Makeup", "Hair", "Skincare", "The Ordinary", "Limited"].map(txt => ({
          type: "div",
          props: {
            innerText: txt,
            style: {
              padding: "8px 16px",
              backgroundColor: "#fff",
              marginBottom: "10px",
              borderRadius: "20px",
              fontSize: "14px",
              whiteSpace: "nowrap",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }
          }
        }))
      },
      {
        type: "div",
        props: {
          innerText: "New arrivals",
          style: {
            fontSize: "18px",
            fontWeight: "bold"
          }
        }
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            width: "100%",
            gap: "12px",
            padding: "1px",
            overflowX: "visible",
          }
        },
        children: [
          {
            title: "Glycolic Acid 7%",
            brand: "The Ordinary",
            price: "$14.50",
            tag: "LIMITED EDITION",
            image: "https://clozette-img.s3.amazonaws.com/img/clean-girl-aesthetic-makeup-products-thebeaulife-beauty-awards-2023-Maybelline-Fit-Me-Concealer.png"
          },
          {
            title: "Glycolic Acid 7%",
            brand: "The Ordinary",
            price: "$14.50",
            tag: "NEW COLLECTION",
            image: "https://vader-prod.s3.amazonaws.com/1709242171-rare-beauty-by-selena-gomez-soft-pinch-liquid-blush-65e0f73798b66.jpg"
          }
        ].map(p => ({
          type: "div",
          props: {
            style: {
              backgroundColor: "#fff",
              padding: "12px",
              borderRadius: "12px",
              width: "140px",
              flexShrink: "0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "6px"
            }
          },
          children: [
            p.tag
              ? {
                  type: "div",
                  props: {
                    innerText: p.tag,
                    style: {
                      backgroundColor: "#000",
                      position: "absolute",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: "6px",
                      fontSize: "10px",
                      width: "fit-content"
                    }
                  }
                }
              : null,
            {
              type: "img",
              props: {
                src: p.image,
                style: {
                  width: "100%",
                  borderRadius: "8px"
                }
              }
            },
            {
              type: "div",
              props: {
                innerText: p.brand,
                style: {
                  fontWeight: "bold"
                }
              }
            },
            {
              type: "div",
              props: {
                innerText: p.title,
                style: {
                  fontSize: "13px"
                }
              }
            },
            {
              type: "div",
              props: {
                innerText: p.price,
                style: {
                  fontWeight: "bold"
                }
              }
            }
          ].filter(Boolean)
        }))
      },
      {
        type: "div",
        props: {
          style: {
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0",
            height: "60px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            borderTop: "1px solid #ddd"
          }
        },
        children: ["🏠", "📊", "🧠", "🔒", "👤"].map(icon => ({
          type: "div",
          props: {
            innerText: icon,
            style: {
              fontSize: "22px"
            }
          }
        }))
      }
    ]
  }
};

ui.render(data)
Script.complete()