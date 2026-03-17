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
      
      <label htmlFor="name">Nome:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Digite seu nome completo"
        className="px-3 py-2 rounded-md text-black"
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Digite seu melhor email"
        className="px-3 py-2 rounded-md text-black"
      />

      <label htmlFor="comentarios">Comentários:</label>
      <textarea
        id="comentarios"
        placeholder="Digite seus comentários aqui"
        className="px-3 py-2 rounded-md text-black"
      ></textarea>

      <button className="bg-[#8c4b5a] py-2 rounded-md hover:opacity-90 transition">
        <strong>Enviar feedback</strong>
      </button>

      <p id="resultadoFale"></p>

    </div>
    
  );
}
