import Image from "next/image";
export default function Header(){
    return(
        <header className="bg-[#804256] text-white flex items-center gap-3 p-4">
            <Image 
                src="/logo.svg"
                alt="Logo"
                width={60}
                height={100}
            />
            <nav>
                <ul className="flex space-x-5 p-10 justify-center">
                    <li className="text-xl hover:underline">
                        <a href="http://localhost:3000/"> HOME </a>
                    </li>
                </ul>
            </nav>
            

        </header>
    )
}