<template>
<div>
    <vue-html2pdf :show-layout="false" :enable-download="false" :preview-modal="true" :paginate-elements-by-height="1400" filename="he" :pdf-quality="2" :manual-pagination="false" pdf-format="a4" pdf-orientation="landscape" pdf-content-width="100%" @progress="onProgress($event)" @hasstartedgeneration="hasStartedGeneration()" @hasgenerated="hasGenerated($event)" ref="html2Pdf">
        <section slot="pdf-content">

            <header id="cabesera">
                <div id="logo">
                    <img src="@/assets/logo.png" alt="">

                </div>

                <div id="contenido">
                    <p>LABORATORIO CLINICO BIO-TEC. TECNOLOGIA,EFICIENCIA Y CALIDAD</p>
                    <p>UME av.Jancito Canel No 612 por 98 y 100 col Bojórquez 978230 Mérida Yuc.</p>
                    <p>Mediprev:Calle 94 No.566A por,Av.Itzáes.97259 Mérida,Yuc</p>
                    <p>Mediprev: Calle 94 No. 566A por , Av. Itzàes, 97259 Mèrida, Yuc</p>
                    <p>Cel:9991635915 Email:biotec.jehc@gmail.com</p>
                    <p>Responsable: Q.F.B Jesus Emmanuel Hau Can 7361205</p>
                    <br>
                    <br>

                </div>
            </header>
            <br>
            <div id="uno">
                <div style="width:40%; display:inline-block; text-align: left">
                    <p>Nombre [Nombre paciente]</p>
                    <p>Edad [Edad_paciente]</p>
                    <p>DR(A) [Medico_tratante]</p>

                </div>
                <div style="width:30%; display:inline-block; text-align: left">
                    <p>Clave [Clave]</p>

                </div>
                <div style="width:30%; display:inline-block; text-align: left">
                    <p>Folio [folio]</p>
                    <p>Fecha [fecha]</p>
                    <p>Sexo [sexo]</p>

                </div>
            </div>

            <footer id="pageFooter">
                <div>
                    <p>Q.F.B Jesus Emanuel Hau Can</p>
                    <p>Cedula profecional:7361205</p>
                </div>

            </footer>
        </section>

    </vue-html2pdf>
    <button @click="generateReport">Download</button>
</div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
export default {
    methods: {
        /*
            Generate Report using refs and calling the
            refs function generatePdf()
        */
        generateReport() {
            this.$refs.html2Pdf.generatePdf()
        },
        getValue() {}
    },
    mounted() {
        var self = this;
        self.$refs.editor.run('code', '<h2>Hello</h2>');
    },
    components: {
        VueHtml2pdf
    }
}
</script>

<style>
#cabesera {
    width: 100%;
    border: 1px blue solid;
    display: flex;
}

#logo {
    width: 15%;

}

#logo img {
    width: 100%;
}

#contenido {
    text-align: center;
    width: 60%;
    font-size: 10px;

}

#contenido p {
    margin: 0px;
    padding: 0px;
    color: #006080;
    font-weight: bold;
}

hr {
    background-color: #1c6a94;
    height: 3px;
}

#uno {
    border-top: 4px #1c6a94 solid;

    text-align: center;
    width: 100%;
    border-bottom: 4px #1c6a94 solid;

}

#pageFooter {
    width: 100%;
    border-bottom: 4px #1c6a94 solid;
}

#pageFooter div {
    width: 100%;

}

#pageFooter p {
    margin: 0px;
    padding: 0px;
    text-align: center;
    font-weight: bold;

}
</style>
