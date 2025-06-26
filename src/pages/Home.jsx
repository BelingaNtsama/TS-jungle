import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "../utils/animations";
import Header from "../layouts/Header";
import Description from "../layouts/Description";
import Caroussel from "../components/Home/Carrousel";
import Shop from "../layouts/Shop";

const Home = () => {
    return (
        <motion.div
            className="flex min-h-screen flex-col"
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.container}
        >
            <motion.div variants={ANIMATION_VARIANTS.item}>
                <Header />
            </motion.div>
            <motion.div variants={ANIMATION_VARIANTS.item}>
                <Description />
            </motion.div>
            <motion.div variants={ANIMATION_VARIANTS.item}>
                <Caroussel />
            </motion.div>
            <motion.div variants={ANIMATION_VARIANTS.item}>
                <Shop />
            </motion.div>
        </motion.div>
    );
};

export default Home;