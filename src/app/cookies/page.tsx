
import * as React from "react"

export default function CookiesPage() {
  return (
    <div className="bg-transparent min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-12">Política de Cookies</h1>
        
        <div className="prose prose-slate max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm border border-black/5">
            <h2 className="text-2xl font-bold text-foreground mb-4">¿Qué son las Cookies?</h2>
            <p>
              Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.
            </p>
          </section>

          <section className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm border border-black/5">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tipos de Cookies utilizadas en esta web</h2>
            <ul className="list-disc pl-6 mt-4 space-y-4">
              <li>
                <strong>Cookies Técnicas:</strong> Son aquellas que permiten al usuario la navegación a través de una página web y la utilización de las diferentes opciones o servicios que en ella existan.
              </li>
              <li>
                <strong>Cookies de Personalización:</strong> Permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario (por ejemplo, el idioma).
              </li>
              <li>
                <strong>Cookies de Análisis:</strong> Son aquellas que bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado.
              </li>
            </ul>
          </section>

          <section className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm border border-black/5">
            <h2 className="text-2xl font-bold text-foreground mb-4">Cómo desactivar las Cookies</h2>
            <p>
              Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Chrome</li>
              <li>Explorer / Edge</li>
              <li>Firefox</li>
              <li>Safari</li>
            </ul>
          </section>

          <section className="bg-primary/10 p-8 rounded-2xl border border-primary/20">
            <p className="italic font-bold text-primary">
              Cafe Bar Titi utiliza cookies de terceros para mejorar su experiencia de navegación y ofrecer contenidos de interés. Al continuar navegando, entendemos que acepta nuestra Política de Cookies.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
