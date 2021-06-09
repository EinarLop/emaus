import Logo from "../Img/logo.webp"
import { Link } from "react-router-dom";

const Header = () => {

    return (
        <>
            <header class="text-gray-600 body-font">
                <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <img src={Logo}></img>
                        <span class="ml-3 text-xl"> COMUNIDAD EMAÚS  A.C </span>
                    </a>
                    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">

                        <Link
                            to="/"
                            class="mr-5 text-base hover:text-gray-900"
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/blog"
                            class="mr-5 text-base hover:text-gray-900"
                        >
                            Blog
                        </Link>
                        <Link
                            to="/eventos"
                            class="mr-5 text-base hover:text-gray-900"
                        >
                            Eventos
                        </Link>
                        <Link
                            to="/donativos"
                            class="mr-5 text-base hover:text-gray-900"
                        >
                            Apóyanos
                        </Link>

                    </nav>

                </div>
            </header>
        </>);
}

export default Header;


