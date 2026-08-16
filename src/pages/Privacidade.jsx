import PageMeta from '../components/ui/PageMeta'
import Hero from '../components/ui/Hero'
import Reveal from '../components/ui/Reveal'
import siteConfig from '../data/siteConfig'
import './Privacidade.css'

function Privacidade() {
  const { contato } = siteConfig

  return (
    <>
      <PageMeta
        title="Política de Privacidade"
        description="Como os dados pessoais fornecidos por usuários e visitantes do website de Sarah Vitória são coletados, utilizados, armazenados e protegidos."
      />
      <Hero
        variant="simple"
        eyebrow="Institucional"
        title="Política de Privacidade"
        text="Última atualização: agosto de 2026"
      />

      <section className="section section--tight privacidade">
        <div className="container container--narrow privacidade__conteudo">
          <Reveal as="p">
            A sua privacidade é importante. Esta Política de Privacidade explica, de forma clara e
            transparente, como os dados pessoais fornecidos por usuários e visitantes do website de
            Sarah Vitória — Nutricionista poderão ser coletados, utilizados, armazenados e
            protegidos.
          </Reveal>
          <Reveal as="p">
            O tratamento de dados pessoais realizado por meio deste website observará a legislação
            aplicável, especialmente a Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais
            (LGPD).
          </Reveal>

          <Reveal as="h2">1. Quais dados podem ser coletados</Reveal>
          <Reveal as="p">
            Dependendo da forma como você utiliza o site, poderão ser coletados dados fornecidos
            diretamente por você, como:
          </Reveal>
          <Reveal as="ul">
            <li>nome;</li>
            <li>e-mail;</li>
            <li>telefone ou WhatsApp;</li>
            <li>informações enviadas voluntariamente em formulários de contato;</li>
            <li>informações necessárias para solicitação ou agendamento de atendimento.</li>
          </Reveal>
          <Reveal as="p">
            Também poderão ser coletadas automaticamente informações técnicas relacionadas à
            navegação, como:
          </Reveal>
          <Reveal as="ul">
            <li>endereço IP;</li>
            <li>tipo de navegador e dispositivo;</li>
            <li>páginas acessadas;</li>
            <li>data e horário de acesso;</li>
            <li>cookies e tecnologias semelhantes, quando utilizados.</li>
          </Reveal>
          <Reveal as="p">
            O website não solicita, por meio de formulários públicos, o envio desnecessário de
            informações relacionadas à saúde. Caso dados de saúde ou outras informações sensíveis
            sejam necessários para a prestação do atendimento nutricional, seu tratamento será
            realizado de acordo com a legislação aplicável e dentro do contexto profissional
            adequado.
          </Reveal>

          <Reveal as="h2">2. Para que os dados são utilizados</Reveal>
          <Reveal as="p">Os dados pessoais poderão ser utilizados para:</Reveal>
          <Reveal as="ul">
            <li>responder mensagens e solicitações de contato;</li>
            <li>fornecer informações sobre consultas e acompanhamento nutricional;</li>
            <li>viabilizar agendamentos;</li>
            <li>realizar comunicações relacionadas ao atendimento solicitado;</li>
            <li>melhorar a experiência e o funcionamento do website;</li>
            <li>garantir segurança e prevenir utilização indevida do site;</li>
            <li>cumprir obrigações legais ou regulatórias aplicáveis.</li>
          </Reveal>
          <Reveal as="p">
            Os dados não serão utilizados para finalidades incompatíveis com aquelas informadas ao
            titular.
          </Reveal>

          <Reveal as="h2">3. Dados relacionados ao atendimento nutricional</Reveal>
          <Reveal as="p">
            Informações relacionadas à saúde possuem proteção especial pela legislação brasileira.
            Dados clínicos, informações nutricionais, exames, histórico de saúde ou demais
            informações sensíveis eventualmente necessárias durante o acompanhamento nutricional não
            devem ser enviados por áreas públicas do website, salvo quando houver ferramenta
            específica e adequada para essa finalidade.
          </Reveal>
          <Reveal as="p">
            O tratamento desses dados ocorrerá apenas quando necessário à prestação do serviço
            profissional e de acordo com as bases legais aplicáveis.
          </Reveal>

          <Reveal as="h2">4. Agendamento e serviços de terceiros</Reveal>
          <Reveal as="p">
            O website poderá utilizar ou direcionar o usuário a serviços externos para
            funcionalidades como:
          </Reveal>
          <Reveal as="ul">
            <li>agendamento de consultas;</li>
            <li>comunicação por WhatsApp;</li>
            <li>localização pelo Google Maps;</li>
            <li>reprodução de conteúdo do Spotify;</li>
            <li>acesso ou integração com Instagram;</li>
            <li>análise técnica de funcionamento e desempenho do website.</li>
          </Reveal>
          <Reveal as="p">
            Ao utilizar esses serviços, determinados dados poderão ser tratados também pelos
            respectivos fornecedores, conforme suas próprias políticas de privacidade. A presença de
            links para plataformas externas não significa que Sarah Vitória possui controle sobre as
            práticas de privacidade adotadas por esses terceiros.
          </Reveal>

          <Reveal as="h2">5. Compartilhamento de dados</Reveal>
          <Reveal as="p">
            Dados pessoais não serão vendidos ou comercializados. O compartilhamento poderá ocorrer
            quando necessário:
          </Reveal>
          <Reveal as="ul">
            <li>com fornecedores responsáveis por serviços técnicos essenciais ao funcionamento do site;</li>
            <li>com plataformas utilizadas para comunicação ou agendamento;</li>
            <li>para cumprimento de obrigação legal, regulatória ou ordem de autoridade competente;</li>
            <li>para proteção de direitos, segurança e prevenção de fraude.</li>
          </Reveal>
          <Reveal as="p">
            Sempre que aplicável, serão adotadas medidas para limitar o compartilhamento ao mínimo
            necessário.
          </Reveal>

          <Reveal as="h2">6. Cookies</Reveal>
          <Reveal as="p">
            O website poderá utilizar cookies e tecnologias semelhantes para garantir seu
            funcionamento, compreender como as páginas são utilizadas e melhorar a experiência de
            navegação. Cookies estritamente necessários poderão ser utilizados para funcionalidades
            essenciais.
          </Reveal>
          <Reveal as="p">
            Caso sejam utilizados cookies adicionais para análise, integração com serviços externos
            ou outras finalidades que exijam consentimento, o usuário poderá receber opções
            adequadas para gerenciar suas preferências. A Autoridade Nacional de Proteção de Dados
            recomenda transparência quanto às finalidades dos cookies e mecanismos que permitam ao
            usuário compreender e, quando aplicável, controlar sua utilização.
          </Reveal>

          <Reveal as="h2">7. Armazenamento e segurança</Reveal>
          <Reveal as="p">
            Serão adotadas medidas técnicas e organizacionais razoáveis para proteger os dados
            pessoais contra:
          </Reveal>
          <Reveal as="ul">
            <li>acesso não autorizado;</li>
            <li>perda;</li>
            <li>alteração;</li>
            <li>divulgação indevida;</li>
            <li>destruição;</li>
            <li>utilização incompatível com as finalidades informadas.</li>
          </Reveal>
          <Reveal as="p">
            Os dados serão mantidos apenas pelo período necessário ao cumprimento das finalidades
            para as quais foram coletados ou conforme exigido pela legislação aplicável.
          </Reveal>

          <Reveal as="h2">8. Direitos do titular</Reveal>
          <Reveal as="p">Nos termos da LGPD, o titular pode solicitar, conforme aplicável:</Reveal>
          <Reveal as="ul">
            <li>confirmação da existência de tratamento;</li>
            <li>acesso aos dados pessoais;</li>
            <li>correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>
              anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em
              desconformidade com a legislação;
            </li>
            <li>informações sobre compartilhamento;</li>
            <li>portabilidade, quando aplicável;</li>
            <li>
              eliminação de dados tratados com base no consentimento, ressalvadas as hipóteses
              legais de conservação;
            </li>
            <li>informação sobre a possibilidade de não fornecer consentimento e sobre suas consequências;</li>
            <li>revogação do consentimento.</li>
          </Reveal>
          <Reveal as="p">
            As solicitações serão analisadas de acordo com os requisitos e limites previstos na
            legislação.
          </Reveal>

          <Reveal as="h2">9. Links externos</Reveal>
          <Reveal as="p">
            O website poderá conter links para páginas e serviços externos. Esta Política de
            Privacidade se aplica apenas ao website oficial de Sarah Vitória e não se estende
            automaticamente às práticas de terceiros. Recomendamos que o usuário consulte as
            políticas de privacidade das respectivas plataformas antes de fornecer dados pessoais.
          </Reveal>

          <Reveal as="h2">10. Alterações nesta Política</Reveal>
          <Reveal as="p">
            Esta Política poderá ser atualizada sempre que houver mudanças no website, nos serviços
            utilizados ou na legislação aplicável. A versão mais recente permanecerá disponível
            nesta página, acompanhada da data de atualização.
          </Reveal>

          <Reveal as="h2">11. Contato sobre privacidade</Reveal>
          <Reveal as="p">
            Para dúvidas, solicitações ou exercício de direitos relacionados aos seus dados
            pessoais, entre em contato:
          </Reveal>
          <Reveal as="p" className="privacidade__contato">
            Sarah Vitória — Nutricionista
            <br />
            E-mail: {contato.email}
            <br />
            WhatsApp: {contato.whatsapp.numero}
          </Reveal>
          <Reveal as="p">
            Caso exista futuramente um canal específico para assuntos relacionados à privacidade e
            proteção de dados, ele deverá ser indicado nesta seção.
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Privacidade
