<template>
  <v-app>
    <v-main>
      <v-container>
        <v-select
          v-model="selectedItems"
          :items="items"
          label="Select Item"
          multiple
          outlined
          clearable
        >
          <template v-slot:selection="{ item, index }">
            <v-chip
              v-if="index < 2"
              class="primary"
            >
              <span
                class="text-truncate"
                style="max-width: 150px;"
              >{{ item }}</span>
            </v-chip>
            <span
              v-if="index === 2"
              class="text-grey text-caption align-self-center ml-2"
            >
              {{ selectedItemsText }}
            </span>
          </template>
        </v-select>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      selectedItems: [],
      items: [
        "Harvard University",
        "Stanford University",
        "Massachusetts Institute of Technology",
        "California Institute of Technology",
        "University of Oxford",
        "University of Cambridge",
        "Princeton University",
        "Yale University",
        "University of Chicago",
        "Columbia University",
        "University of Pennsylvania",
        "Cornell University",
        "University of California, Berkeley",
        "University of California, Los Angeles",
        "University of California, San Diego",
        "University of Michigan, Ann Arbor",
        "University of Toronto",
        "University of British Columbia",
        "McGill University",
        "ETH Zurich - Swiss Federal Institute of Technology",
        "University of Tokyo",
        "National University of Singapore",
        "Peking University",
        "Tsinghua University",
        "Australian National University",
        "University of Melbourne",
        "University of Sydney",
        "University of New South Wales",
        "London School of Economics and Political Science",
        "Imperial College London",
        "University College London",
        "King's College London",
        "University of Edinburgh",
        "University of Manchester",
        "University of Bristol",
        "University of Warwick",
        "University of Glasgow",
        "University of Amsterdam",
        "Leiden University",
        "Utrecht University",
        "Delft University of Technology",
        "University of Copenhagen",
        "Technical University of Munich",
        "Heidelberg University",
        "Ludwig-Maximilians-University Munich",
        "Freie Universität Berlin",
        "Humboldt University of Berlin",
        "University of Zurich",
        "Karlsruhe Institute of Technology",
        "University of Helsinki",
        "University of Oslo",
        "University of Stockholm",
        "KTH Royal Institute of Technology",
        "Lund University",
        "University of Barcelona",
        "Autonomous University of Barcelona",
        "Complutense University of Madrid",
        "Technical University of Madrid",
        "University of Lisbon",
        "University of Porto",
        "University of Milan",
        "University of Rome La Sapienza",
        "University of Florence",
        "University of Bologna",
        "University of Warsaw",
        "Jagiellonian University",
        "Charles University",
        "Moscow State University",
        "St. Petersburg State University",
        "Novosibirsk State University",
        "University of Cape Town",
        "University of the Witwatersrand",
        "University of Nairobi",
        "University of Lagos",
        "University of São Paulo",
        "University of Buenos Aires",
        "Pontifical Catholic University of Chile",
        "University of Chile",
        "National Autonomous University of Mexico",
        "University of São Paulo",
        "University of Buenos Aires",
        "Pontifical Catholic University of Chile",
        "University of Chile",
        "National Autonomous University of Mexico",
        "University of Sydney",
        "University of Melbourne",
        "University of New South Wales",
        "University of Queensland",
        "University of Auckland",
        "University of Otago",
        "University of Alberta",
        "McMaster University",
        "University of Waterloo",
        "Western University",
        "University of Calgary",
        "University of British Columbia",
        "Simon Fraser University",
        "University of Victoria",
        "University of Ottawa",
        "Carleton University",
        "University of Toronto",
        "University of Western Ontario",
        "York University",
      ],
    };
  },
  computed: {
    selectedItemsText() {
      const selectedCount = this.selectedItems.length - 2;
      if (selectedCount > 0) {
        return `(+${selectedCount} Selecionados)`;
      } else {
        return "";
      }
    },
  },
};
</script>