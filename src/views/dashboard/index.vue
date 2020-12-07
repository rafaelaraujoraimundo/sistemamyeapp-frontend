<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="5"
        ><div>
          <el-image
            style="width: 100px; height: 100px"
            :src="user.empresa.logoempresa"
            fit="contain"
          ></el-image></div
      ></el-col>
      <el-col :span="8"
        ><div>
          <el-select
            v-model="filtroSelect"
            placeholder="Selecione Periodo"
            @change="selecionarPeriodo"
          >
            <el-option
              v-for="item in filtros"
              :key="item.periodo"
              :label="item.periodo"
              :value="item.periodo"
            >
            </el-option>
          </el-select>
          <span class="teste"
            ><h4>Empresa: {{ user.empresa.nomeempresa }}</h4></span
          >
          <span
            ><h5>Filial: {{ user.filial.nomefilial }}</h5></span
          >
        </div></el-col
      >
      <el-col :span="8"
        >
          <el-table
            size="mini"
            :row-style="tableRowsStyle"
            :data="notaDashboard"
            :cell-style="{padding: '0', height: '9px'}"
            :showHeader="false"
          >
            <el-table-column prop="nota" label="" width="35"> </el-table-column>
            <el-table-column label="" width="35"> >= </el-table-column>
            <el-table-column prop="inicio" label="" width="53">
            </el-table-column>
            <el-table-column label="" width="35"> <= </el-table-column>
            <el-table-column prop="fim" label="" width="57"> </el-table-column>
          </el-table></el-col>
      <el-col :span="3"
        ><div class="grid-content nota" :style="{ background: this.corNota }">
          {{ nota  }}
        </div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        ><div>
          <el-table
            size="mini"
            :data="PainelGeralDashboard"
            @row-click="clicarnaCelula"
            :row-style="tableRowsStyle2"
            
          >
            <!--<el-table-column prop="indicadorPrincipal.id" label="ID" width="40"> </el-table-column>-->
            <el-table-column
              prop="indicadorPrincipal.descricao"
              label="Indicador"
              width="170"
            >
            </el-table-column>
            <el-table-column
              prop="orcadometa"
              label="Orçado / Meta"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="realizado"
              label="Realizado / Meta"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="peso" label="Peso" width="55">
            </el-table-column>
            <el-table-column prop="pontuacao" label="Pont." width="55">
            </el-table-column>
          </el-table>
                <el-col :span="24"
        ><div>
          <el-table
            size="mini"
            :data="DetalheIndicadorFiltrado"
            :row-style="tableRowsStyle2"
          >
            <el-table-column class-name="teste" prop="descricao" label="Indicador" width="320">
            </el-table-column>
            <el-table-column prop="meta" label="Meta" width="90">
            </el-table-column>
            <el-table-column prop="resultado" label="Resultado" width="90">
            </el-table-column>
          </el-table></div
      ></el-col>
        </div>
      </el-col>
      <el-col :span="12"
        ><div id="grafico" style="{width: 255px !important; height: 100px !important}"><chart :options="chartOptionsBar"></chart></div
      ></el-col>
    </el-row>
    <el-row :gutter="20">

    </el-row>
  </div>
</template>

<script>
import { notas, Dashboard } from "@/api/dashboard";
import { mapGetters } from "vuex";
import store from '../../store'

export default {
  name: "Dashboard",
  data() {
    return {

      nota: '',
      corNota: '',
      eixoX: [],
      eixoY: [],
      eixoY2: [],
      chartOptionsBar: {},
      notaDashboard: [],
      notaFilialDashboard: [],
      PainelGeralDashboard: [],
      DetalheIndicadorDashboard: [],
      graficos: [],
      filtros: [],
      filtroSelect: "",
      filtroPrinc: "",
      form: {
        periodo: "",
      },
      periodoSel: "",
      DetalheIndicadorFiltrado: [],
      graficosFiltrado: [],
    };
  },
  computed: {
    ...mapGetters(["logoEmpresa"]),
    ...mapGetters(["user"]),
  },
  created() {
    notas().then((response) => {
      this.notaDashboard = response.results;
    });
     store.dispatch('user/getInfo')
    
    this.chartOptionsBar = {
        title: {
          text: "Teste"
        },
        xAxis: {
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            data: [],
            label: {
              show: true
            }
          },
          {
            type: "bar",
            data: [],
            label: {
              show: true
            }
          },
        ],
      }
    
    this.PreencherDashboard(this.filtroSelect);
  },
  methods: {
    tableRowsStyle({ row, column, rowIndex, columnIndex }) {
      return { "background": row.cor, color: "#fff", "font-size": "12px", "width": "40px" };
    },
    tableRowsStyle2({ row, column, rowIndex, columnIndex }) {
      return {"font-size": "12px" };
    },
    VerificaData() {
      let data = new Date();
      let YEAR = data.getFullYear();
      let MONTH = data.getMonth();

      if (MONTH == 0) {
        YEAR = YEAR - 1;
        MONTH = 12;
      }
      this.form.periodo = YEAR + ("0" + MONTH).slice(-2);
      return YEAR + ("0" + MONTH).slice(-2);
    },
    PreencherDashboard(filtro) {
      this.filtroSelect = filtro;
      if (this.filtroSelect == "") {
        this.filtroSelect = this.VerificaData();
      }
      this.form.periodo = this.filtroSelect;
      Dashboard(this.form).then((response) => {
        this.notaFilialDashboard = response.results.notaFilial;
        this.nota = this.notaFilialDashboard[0].nota;
         this.corNota = this.notaDashboard.filter(
          (nota) => {
            return this.nota == nota.nota
          })
        this.corNota = this.corNota[0].cor
        console.log(this.corNota)
        this.PainelGeralDashboard = response.results.painelGeral;
        this.DetalheIndicadorDashboard = response.results.detalheIndicador;
        this.filtros = response.results.filtros;
        this.graficos = response.results.graficos;
      });
    },
    selecionarPeriodo(data) {
      this.PreencherDashboard(data);
    },
    clicarnaCelula(row) {
      this.filtroPrinc = row.indicadorPrincipal.id;
      this.DetalheIndicadorFiltrado = this.DetalheIndicadorDashboard.filter(
        (indicador) => {
          return this.filtroPrinc == indicador.indicador.id;
        }
      
      );
      let X = []
      let Y = []
      let Y2 = []
      this.graficos.filter(
        (indicador) => {
          if(this.filtroPrinc == indicador.idindicador){
            X.push(indicador.periodo)
            Y.push(indicador.realizado)
            Y2.push(indicador.orcadometa)
          }
        }
      )
      this.eixoX = X
      this.eixoY = Y
      this.eixoY2 = Y2
      this.chartOptionsBar = {
        
        xAxis: {
          title: {
            text: 'Text',
            show: true
          },
          data: this.eixoX,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            data: this.eixoY,
            label: {
              show: true
            }
          },
           {
            type: "line",
            data: this.eixoY2,
            label: {
              show: true
            }
          },
        ],
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 13px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.nota {
  font-size: 110px !important;
  text-align: center !important;
  padding: 0 0;
  color: white;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;

}
</style>
