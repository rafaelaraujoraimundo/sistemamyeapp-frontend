<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="5"
        ><div>
          <el-image
            style="width: 100px; height: 100px"
            :src="logoEmpresa"
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
        ><div class="grid-content">
          <el-table
            size="mini"
            :row-style="tableRowsStyle"
            :data="notaDashboard"
          >
            <el-table-column prop="nota" label="" width="35"> </el-table-column>
            <el-table-column label="" width="35"> >= </el-table-column>
            <el-table-column prop="inicio" label="" width="53">
            </el-table-column>
            <el-table-column label="" width="35"> <= </el-table-column>
            <el-table-column prop="fim" label="" width="57"> </el-table-column>
          </el-table></div
      ></el-col>
      <el-col :span="3"
        ><div class="grid-content">
          <h1>{{ notaFilialDashboard[0].nota }}</h1>
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
        ><div class="grid-content">
          <el-table
            size="mini"
            :data="DetalheIndicadorFiltrado"
          >
            <el-table-column prop="descricao" label="Indicador" width="300">
            </el-table-column>
            <el-table-column prop="meta" label="Meta" width="95">
            </el-table-column>
            <el-table-column prop="resultado" label="Resultado" width="95>
            </el-table-column>
          </el-table></div
      ></el-col>
        </div>
      </el-col>
      <el-col :span="12"
        ><div id="grafico"><chart :options="chartOptionsBar"></chart></div
      ></el-col>
    </el-row>
    <el-row :gutter="20">

    </el-row>
  </div>
</template>

<script>
import { notas, Dashboard } from "@/api/dashboard";
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
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
    
    this.chartOptionsBar = {
        title: {
          text: "Teste"
        },
        xAxis: {
          data: ["Q1", "Q2", "Q3", "Q4"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            data: [63, 75, 24, 92],
            label: {
              show: true
            }
          },
          {
            type: "bar",
            data: [23, 43, 12, 1],
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
      return { "background-color": row.cor, color: "#fff" };
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
      console.log(this.filtroPrinc);
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
      console.log(this.eixoX)
      console.log(this.eixoY)
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
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

teste {
  margin-bottom: 20px;
  padding: 10px 0;
  border-radius: 4px;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
