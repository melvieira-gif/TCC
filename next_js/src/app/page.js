import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#e4bbb1] flex flex-col min-h-screen items-center justify-start text-[#f2e9e1] pt-20">
      <h2>HOME</h2>
      
      <p className="items-center justify-center max-w-7xl">
      A StarDev surgiu da percepção de que faltava um curso de TI online que reunisse os
      principais conteúdo do curso técnico de forma clara, objetiva e direta ao ponto. 
      Nossa inspiração veio de duas plataformas de cursos online: a FERRETO, 
      voltada para vestibulares, e a CURSO.DEV, um curso pago focado em programação. 
      Decidimos, aprimorar dois polos, que já são bons no mercado, em um só.
      Aqui na StarDev criamos o nosso próprio conteúdo, por meio de vídeos, 
      disponível na plataforma de streaming YouTube, 
      vídeos esses que serão direcionados para a nossa plataforma. 
      Sobre essa perspectiva, 
      nossos usuários terão em sua tela inicial acesso a todas as disciplinas, 
      escolherá uma de seu agrado, e será direcionado para uma próxima página, 
      que porventura será distribuído aulas independentes sobre cada “parte” da disciplina escolhida, porém haverá algumas instruções de ser conteúdo para: Iniciantes, Intermediários e Avançados.
      </p>
      <div className="flex flex-col gap-4 max-w-md w-full m-10">
        <label htmlFor="name" className="font-josefin text-[#804256]">
          Nome:
        </label>
        <input
          type="text"
          id="name"
          placeholder="Digite seu nome"
          className="w-full px-2.5 py-2 border-2 border-[#804256] rounded-md bg-transparent text-[#804256] font-josefin placeholder-[#804256] italic focus:outline-none"
        />

        <label htmlFor="email" className="font-josefin text-[#804256]">
          Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="Digite seu email"
          className="w-full px-2.5 py-2 border-2 border-[#804256] rounded-md bg-transparent text-[#804256] font-josefin placeholder-[#804256] italic focus:outline-none"
        />

        <label htmlFor="comentarios" className="font-josefin text-[#804256]">
          Comentários:
        </label>
        <textarea
          id="comentarios"
          placeholder="Digite seus comentários aqui"
          className="w-full px-2.5 py-2 border-2 border-[#804256] rounded-md bg-transparent text-[#804256] font-josefin placeholder-[#804256] italic focus:outline-none"
        />

        <button className="bg-[#716f35] text-[#f2e9e1] px-4 py-2 rounded-md cursor-pointer">
          Enviar feedback
        </button>
      </div>

    </div>
    
  );
}
