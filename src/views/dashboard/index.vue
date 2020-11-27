<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6"
        ><div>
          <el-image
            style="width: 100px; height: 100px"
            :src="logoEmpresa"
            fit="contain"
          ></el-image></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">FILTROS</div></el-col
      >
      <el-col :span="7"
        ><div class="grid-content bg-purple">
          <el-table
            size="mini"
            :row-style="tableRowsStyle"
            :data="notaDashboard"
          >
            <el-table-column
              prop="nota"
              label=""
              width="40"
            >
            </el-table-column>
            <el-table-column label="" width="35"> >= </el-table-column>
            <el-table-column prop="inicio" label="" width="60">
            </el-table-column>
            <el-table-column label="" width="35"> <= </el-table-column>
            <el-table-column prop="fim" label="" width="57"> </el-table-column>
          </el-table></div
      ></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">NOTA</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        ><div class="grid-content bg-purple">Painel GERAL</div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple">Grafico</div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24"
        ><div class="grid-content bg-purple">
      </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { notas } from "@/api/dashboard";
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      notaDashboard: new Object(),
    };
  },
  computed: {
    ...mapGetters(["logoEmpresa"]),
  },
  created() {
    notas().then((response) => {
      this.notaDashboard = response.results;
      console.log(this.notaDashboard);
    });
  },
  methods: {
   tableRowsStyle ({row, column, rowIndex, columnIndex}) {
     return {"background-color": row.cor, "color": "#fff"}
     }
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
