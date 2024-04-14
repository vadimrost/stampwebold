import { motion } from 'framer-motion'
import { Icons } from '../assets/icons'

function Card({ isFlipped, setIsFlipped, data }) {
  const transitionConfig = {
    duration: 0.5
  }

  let stamps = [
    {
      name: 'junkFood',
      image: Icons.junkFood
    },
    {
      name: 'meal',
      image: Icons.meal
    },
    {
      name: 'pizza',
      image: Icons.pizza
    }
  ]

  const getStamp = (name) => {
    let found = stamps.find((v) => v.name === name)
    return found.image
  }

  const getLogo = (name) => {
    let found = stamps.find((v) => v.name === name)
    return found?.image
  }

  const getCardsStyle = (items) => {
    switch (items) {
      case 2:
        return {
          parentDiv: 'flex flex-col flex-1 gap-12 justify-center items-center',
          topDiv: {
            noOfItems: 1,
            style: 'flex justify-center',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          },
          bottomDiv: {
            noOfItems: 1,
            style: 'flex justify-center',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          }
        }
      case 3:
        return {
          parentDiv: 'flex flex-col flex-1 gap-12 justify-center items-center',
          topDiv: {
            noOfItems: 2,
            style: 'flex justify-between w-[65%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          },
          bottomDiv: {
            noOfItems: 1,
            style: 'flex justify-center',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          }
        }
      case 4:
        return {
          parentDiv: 'flex flex-col flex-1 gap-12 justify-center items-center',
          topDiv: {
            noOfItems: 2,
            style: 'flex justify-between w-[65%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          },
          bottomDiv: {
            noOfItems: 2,
            style: 'flex justify-between w-[65%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          }
        }
      case 5:
        return {
          parentDiv: 'flex flex-col flex-1 gap-12 justify-center items-center',
          topDiv: {
            noOfItems: 3,
            style: 'flex justify-between w-[65%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          },
          bottomDiv: {
            noOfItems: 2,
            style: 'flex justify-center gap-14',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          }
        }
      case 6:
        return {
          parentDiv: 'flex flex-col flex-1 gap-12 justify-center items-center',
          topDiv: {
            noOfItems: 3,
            style: 'flex justify-between w-[65%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          },
          bottomDiv: {
            noOfItems: 3,
            style: 'flex justify-between w-[65%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          }
        }
      case 7:
        return {
          parentDiv: 'flex flex-col flex-1 gap-12 justify-center items-center',
          topDiv: {
            noOfItems: 4,
            style: 'flex justify-between w-[75%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          },
          bottomDiv: {
            noOfItems: 3,
            style: 'flex justify-center gap-14',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          }
        }
      case 8:
        return {
          parentDiv: 'flex flex-col flex-1 gap-12 justify-center items-center',
          topDiv: {
            noOfItems: 4,
            style: 'flex justify-between w-[75%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          },
          bottomDiv: {
            noOfItems: 4,
            style: 'flex justify-between w-[75%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          }
        }
      case 9:
        return {
          parentDiv: 'flex flex-col flex-1 gap-12 justify-center items-center',
          topDiv: {
            noOfItems: 5,
            style: 'flex justify-between w-[75%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          },
          bottomDiv: {
            noOfItems: 4,
            style: 'flex justify-center gap-6',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          }
        }
      case 10:
        return {
          parentDiv: 'flex flex-col flex-1 gap-12 justify-center items-center',
          topDiv: {
            noOfItems: 5,
            style: 'flex justify-between w-[75%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          },
          bottomDiv: {
            noOfItems: 5,
            style: 'flex justify-between w-[75%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          }
        }
      case 11:
        return {
          parentDiv: 'flex flex-col flex-1 gap-12 justify-center items-center',
          topDiv: {
            noOfItems: 6,
            style: 'flex justify-between w-[85%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          },
          bottomDiv: {
            noOfItems: 5,
            style: 'flex justify-center gap-6',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          }
        }
      case 12:
        return {
          parentDiv: 'flex flex-col flex-1 gap-12 justify-center items-center',
          topDiv: {
            noOfItems: 6,
            style: 'flex justify-between w-[85%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          },
          bottomDiv: {
            noOfItems: 6,
            style: 'flex justify-between w-[85%]',
            childSize: 'h-[50px] w-[50px]  rounded-full'
          }
        }
    }
  }

  return (
    <div className="relative flex max-h-[100%] w-[50%] justify-center">
      <div className="sticky top-[50%] h-[38.5vh] w-[65%] -translate-y-[50%] ">
        <motion.div className="card__wrapper h-full w-full cursor-pointer">
          {/* FRONT */}
          <motion.div
            transition={transitionConfig}
            initial={false}
            animate={{ rotateY: isFlipped ? -180 : 0 }}
            style={{
              backgroundColor: data.cardBackground.color
            }}
            className={`card h-full w-full`}>
            <div className="flex h-full w-full flex-col pt-2">
              <h1 className="w-full text-center text-2xl">Your stamp card</h1>
              <div className={getCardsStyle(data.noOfStamps)?.parentDiv}>
                <div className={getCardsStyle(data.noOfStamps)?.topDiv['style']}>
                  {Array(getCardsStyle(data.noOfStamps)?.topDiv['noOfItems'])
                    .fill()
                    .map((v) => {
                      return (
                        <div style={{ backgroundColor: data.stampBackground.color }} className={getCardsStyle(data.noOfStamps)?.topDiv['childSize']} key={v}>
                          {data.stamp && <img src={getStamp(data.stamp)} className={getCardsStyle(data.noOfStamps)?.bottomDiv['childSize']} />}
                        </div>
                      )
                    })}
                </div>
                <div className={getCardsStyle(data.noOfStamps)?.bottomDiv['style']}>
                  {Array(getCardsStyle(data.noOfStamps)?.bottomDiv['noOfItems'])
                    .fill()
                    .map((v) => {
                      return (
                        <div style={{ backgroundColor: data.stampBackground.color }} className={getCardsStyle(data.noOfStamps)?.bottomDiv['childSize']} key={v}>
                          {data.stamp && <img src={getStamp(data.stamp)} className={getCardsStyle(data.noOfStamps)?.bottomDiv['childSize']} />}
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* BACK */}
          <motion.div
            transition={transitionConfig}
            initial={false}
            animate={{ rotateY: isFlipped ? 0 : 180 }}
            style={{
              backgroundColor: data.cardBackground.color
            }}
            className={`card flex h-full w-full flex-col items-center gap-7 `}>
            <div className="mt-3 h-[55px] w-[55px] rounded-full">
              {data.logo && <img src={data.logo.type === 'manual' ? getLogo(data.logo.blob) : URL?.createObjectURL(data?.logo?.blob)} className="h-full w-full rounded-full" />}
            </div>
            <p className="text-center">{data.cardText}</p>
          </motion.div>
        </motion.div>
        <div className="flex items-center justify-center gap-3 pt-5">
          <h1
            onClick={() => {
              setIsFlipped(false)
            }}
            className={`${!isFlipped ? 'font-[600]' : ' hover:underline'} cursor-pointer text-[12px]`}>
            Front
          </h1>
          <div className="rounded-full p-2 hover:bg-[#F3F5F9]">
            <img onClick={() => setIsFlipped(!isFlipped)} src={Icons.flip} className="h-6 w-6 cursor-pointer" />
          </div>
          <h1
            onClick={() => {
              setIsFlipped(true)
            }}
            className={`${isFlipped ? 'font-[600]' : ' hover:underline'} cursor-pointer text-[12px]`}>
            Back
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Card
