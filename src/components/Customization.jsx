import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icons } from '../assets/icons'
import useStore from '../store'

const Customization = ({ isFlipped, data }) => {
  const [image, setImage] = useState(null)
  const navigate = useNavigate()
  const setData = useStore((state) => state.setCardData)

  const [colorPicker, setShowColorPicker] = useState(false)
  const colors = {
    writing: ['#000000', '#FFFFFF'],
    cardBackground: ['#B2CBC0', '#DCD2C8', '#FEEFE0', '#FDE7E1', '#D1C4E9', '#B0BEC5', '#E1F5FE'],
    stampBackground: ['#E1F5FE', '#FFE68F', '#84D7B2', '#FFBBB7', '#FAFAFA'],
    stamps: [
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
    ],
    logo: [
      {
        name: 'pizza',
        image: Icons.pizza
      },
      {
        name: 'add',
        image: Icons.add
      }
    ]
  }

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  // Function to call when file is selected
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setData({ ...data, logo: { type: 'custom', blob: event.target.files[0] } })
      setImage(URL.createObjectURL(event.target.files[0]))
    }
    const file = event.target.files[0]
    if (file && file.type.substr(0, 5) === 'image') {
      setData({ ...data, logo: { type: 'custom', blob: event.target.files[0] } })
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file)) // Create a URL for the file
    } else {
      setSelectedFile(null)
      setPreviewUrl(null)
    }
  }

  return (
    <div className="flex w-[50%] flex-col py-10 text-black">
      <h1 className="text-center text-3xl font-semibold">Create your map </h1>
      {!isFlipped && (
        <div className="flex flex-1 flex-col gap-6">
          {/* Number of stamps */}
          <div className="flex flex-col gap-4">
            <h1 className="mt-8 text-2xl">Front</h1>

            <div className="flex flex-col gap-3">
              <h1 className="font-[300]">Number of stamps</h1>
              <div className="flex flex-wrap gap-3">
                {Array(11)
                  .fill()
                  .map((_, index) => index + 2)
                  .map((v) => {
                    return (
                      <div
                        className="relative flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-[#EEE] hover:bg-[#F5F7F8]"
                        key={v}
                        onClick={() => setData({ ...data, noOfStamps: v })}>
                        {v}
                        {data.noOfStamps === v && (
                          <div className="absolute right-[-5px] top-[-5px] h-[20px] w-[20px]">
                            <img src={Icons.tick} />
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>

          {/* Card Background Color */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <h1 className="font-[300]"> Card Background Color </h1>
              <div className="flex flex-wrap gap-5">
                {colors.cardBackground.map((v, i) =>
                  i !== colors.cardBackground.length - 1 ? (
                    <div
                      key={i} // Make sure to use a unique key for each child in a list
                      className="relative h-[35px] w-[35px] cursor-pointer rounded-full"
                      style={{
                        backgroundColor: v,
                        border: i === 1 ? '1px solid #EEEEEE' : undefined
                      }}
                      onClick={() =>
                        setData({
                          ...data,
                          cardBackground: { type: 'manual', color: v }
                        })
                      }>
                      {data.cardBackground.color === v && data.cardBackground.type === 'manual' && (
                        <div className="absolute right-[-5px] top-[-5px] h-[20px] w-[20px]">
                          <img src={Icons.tick} alt="tick" /> {/* Add an alt tag for accessibility */}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      key={i} // Make sure to use a unique key for each child in a list
                      className="relative z-20 h-[35px] w-[35px] cursor-pointer rounded-full"
                      onClick={() => setShowColorPicker(true)}>
                      <input
                        type="color"
                        className="absolute z-10 w-[30px] cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-[#84D7B2] to-[#F77D75]"
                        id={`color-picker-${i}`} // ID should be unique if used within a loop
                        onChange={(e) =>
                          setData({
                            ...data,
                            cardBackground: {
                              type: 'custom',
                              color: e.target.value
                            }
                          })
                        }
                        onClick={(e) => {
                          setData({
                            ...data,
                            cardBackground: {
                              type: 'custom',
                              color: e.target.value
                            }
                          })
                        }}
                      />
                      {data.cardBackground.type === 'custom' && (
                        <div className="absolute right-[-5px] top-[-5px] z-[10000] h-[20px] w-[20px]">
                          <img src={Icons.tick} alt="tick" /> {/* Add an alt tag for accessibility */}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          {/* Stamp Background Color */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <h1 className="font-[300]">Stamp Background Color</h1>
              <div className="flex flex-wrap gap-5">
                {colors.stampBackground.map((v, i) =>
                  i !== colors.stampBackground.length - 1 ? (
                    <div
                      key={i} // Make sure to use a unique key for each child in a list
                      className="relative h-[35px] w-[35px] cursor-pointer rounded-full"
                      style={{
                        backgroundColor: v,
                        border: i === 1 ? '1px solid #EEEEEE' : undefined
                      }}
                      onClick={() =>
                        setData({
                          ...data,
                          stampBackground: { type: 'manual', color: v }
                        })
                      }>
                      {data.stampBackground.color === v && data.stampBackground.type === 'manual' && (
                        <div className="absolute right-[-5px] top-[-5px] h-[20px] w-[20px]">
                          <img src={Icons.tick} alt="tick" /> {/* Add an alt tag for accessibility */}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      key={i} // Make sure to use a unique key for each child in a list
                      className="relative z-20 h-[35px] w-[35px] cursor-pointer rounded-full"
                      onClick={() => setShowColorPicker(true)}>
                      <input
                        type="color"
                        className="absolute z-10 w-[30px] cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-[#84D7B2] to-[#F77D75]"
                        id={`color-picker-${i}`} // ID should be unique if used within a loop
                        onChange={(e) =>
                          setData({
                            ...data,
                            stampBackground: {
                              type: 'custom',
                              color: e.target.value
                            }
                          })
                        }
                        onClick={(e) => {
                          setData({
                            ...data,
                            stampBackground: {
                              type: 'custom',
                              color: e.target.value
                            }
                          })
                        }}
                      />
                      {data.stampBackground.type === 'custom' && (
                        <div className="absolute right-[-5px] top-[-5px] z-[10000] h-[20px] w-[20px]">
                          <img src={Icons.tick} alt="tick" /> {/* Add an alt tag for accessibility */}
                        </div>
                      )}
                    </div>
                  )
                )}
                {/* <div className="h-[35px] w-[35px] cursor-pointer  rounded-full bg-gradient-to-r from-[#84D7B2] to-[#F77D75]"></div> */}
              </div>
            </div>
          </div>
          {/* Stamps */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <h1 className="font-[300]">Stamps</h1>
              <div className="flex flex-wrap gap-5">
                {colors.stamps.map((v, i) => {
                  return (
                    <div
                      className="relative flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full"
                      onClick={() => setData({ ...data, stamp: v.name })}
                      style={{
                        border: '1px solid #EEEEEE'
                      }}>
                      <img src={v.image} className="h-[35px] w-[35px]" alt="" srcset="" />
                      {data.stamp === v.name && (
                        <div className="absolute right-[-5px] top-[-5px] h-[20px] w-[20px]">
                          <img src={Icons.tick} alt="tick" /> {/* Add an alt tag for accessibility */}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {isFlipped && (
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="mt-8 text-2xl">Back</h1>
            {/* Card Logo */}
            <div className="flex flex-col gap-2">
              <h1 className="font-[300]">Logo</h1>
              <div className="flex flex-wrap gap-5">
                <div className="flex flex-wrap gap-5">
                  {colors.logo.map((v, i) => {
                    if (i !== 1) {
                      return (
                        <div
                          key={i}
                          className="relative flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full"
                          onClick={() => setData({ ...data, logo: { type: 'manual', blob: v.name } })}
                          style={{
                            border: '1px solid #EEEEEE'
                          }}>
                          <img src={v.image} className="h-[35px] w-[35px]" alt="" />
                          {data.logo.blob === v.name && data.cardBackground.type === 'manual' && (
                            <div className="absolute right-[-5px] top-[-5px] h-[20px] w-[20px]">
                              <img src={Icons.tick} alt="tick" /> {/* Add an alt tag for accessibility */}
                            </div>
                          )}
                        </div>
                      )
                    } else {
                      return (
                        <div
                          key={i}
                          className="relative flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full"
                          style={{
                            border: '1px solid #EEEEEE'
                          }}>
                          {/* Hidden file input */}
                          <input type="file" id={`file-uploader-${i}`} style={{ display: 'none' }} onChange={handleFileChange} />
                          {/* Image wrapped in label to represent the uploader */}
                          <label htmlFor={`file-uploader-${i}`}>
                            <img
                              src={image !== null ? image : Icons.add} // Replace 'default-image.jpg' with your placeholder image if needed
                              className="h-[35px] w-[35px] cursor-pointer  rounded-full" // Add cursor-pointer to indicate it's clickable
                              alt="Upload"
                            />
                          </label>
                          {data.logo.type === 'custom' && (
                            <div className="absolute right-[-5px] top-[-5px] h-[20px] w-[20px]">
                              <img src={Icons.tick} alt="tick" /> {/* Add an alt tag for accessibility */}
                            </div>
                          )}
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
            {/* Card Text */}
            <div className="flex flex-col gap-2">
              <h1 className="font-[300]">Your card text</h1>
              <textarea
                className="w-[70%] resize-none rounded-lg border p-2"
                rows={8}
                value={data.cardText}
                onChange={(e) => setData({ ...data, cardText: e.target.value })}
                placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum soluta cum, a ipsa debitis quo explicabo voluptate unde molestias rem!"
              />
            </div>
          </div>
        </div>
      )}
      <button onClick={() => navigate('OnBoarding')} type="submit" className="mr-8 self-end rounded-xl bg-[#EDF0FF] px-[2rem] py-[6.5px] font-bold text-[#4D69FA]">
        Next
      </button>
    </div>
  )
}

export default Customization
