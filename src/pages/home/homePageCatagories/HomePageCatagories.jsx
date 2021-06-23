import classes from "./HomePageCatagories.module.css";
import { CatagoryCard } from "./CatagoryCard/CatagoryCard";

const catagoryData = [
  {
    id: 1,
    name: "Basic Camera Usage",
    image:
      "https://res.cloudinary.com/docpuxue8/image/upload/v1617475428/PixWeb/Basic_camera_usage_p8tj4u.jpg",
    description:
      "Learn how to use your camera intuitively and how to take stunning photographs by mastering both the technical and creative sides of digital photography.",
  },
  {
    id: 2,
    name: "Composition",
    image:
      "https://res.cloudinary.com/docpuxue8/image/upload/v1617475531/PixWeb/Composition_oqx898.jpg",
    description:
      "A good composition is what seperates the good photos from the great ones. Learn how to masterfully compose stunnig shots to up your photograpgy game.",
  },
  {
    id: 3,
    name: "Camera Maintainance",
    image:
      "https://res.cloudinary.com/docpuxue8/image/upload/v1617476625/PixWeb/CameraMaintainance_spphlf.jpg",
    description:
      "Equipment maintainance is the mark of a professional. Learn the art of maintaining your camera gear, including cleaning your camera sensor, and cleaning your lenses to remove dust",
  },
  {
    id: 4,
    name: "Cool Camera Tricks",
    image:
      "https://res.cloudinary.com/docpuxue8/image/upload/v1617479647/PixWeb/CoolCameraTricks_iq1w5z.jpg",
    description:
      "Want your pics to standout from the crowd? Well then you have come to the right place.",
  },
  {
    id: 5,
    name: "Night Photography",
    image:
      "https://res.cloudinary.com/docpuxue8/image/upload/v1617480072/PixWeb/NightPhotography_qd8jlr.jpg",
    description:
      "Environment and lighting are things that we may not be able to control all the time. Learn how to take stunning photos under lowlight conditions.",
  },
  {
    id: 6,
    name: "Astro Photography",
    image:
      "https://res.cloudinary.com/docpuxue8/image/upload/v1617480202/PixWeb/AstroPhotography_pt88hr.jpg",
    description:
      "You don't always need an expensive telescope to photograph the cosmos. Learn how to take stunning astro photography with the kit you have lying around.",
  },
];

export const HomePageCatagories = () => {
  return (
    <div className={classes["homepage-catagories-container"]}>
      <h1>Click To Start Learning</h1>
      <ul>
        {catagoryData.map(({ id, name, description, image }) => (
          <li key={id}>
            <CatagoryCard
              id={id}
              name={name}
              description={description}
              image={image}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
