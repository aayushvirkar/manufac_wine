import wineData from "./data/Wine-Data.json";
import Table from "./components/Table";
import { formatWineData, formatGamaData } from "./utils/winedata.util";
import "./App.css";

export interface WineData {
  [key: string]: number | string;
  Alcohol: number;
  "Malic Acid": number;
  Ash: number | string;
  "Alcalinity of ash": number;
  Magnesium: number;
  "Total phenols": number;
  Flavanoids: number | string;
  "Nonflavanoid phenols": number | string;
  Proanthocyanins: string | number;
  "Color intensity": number | string;
  Hue: number | string;
  "OD280/OD315 of diluted wines": number | string;
  Unknown: number;
}

function App() {
  const formattedFlavanoidData = formatWineData(wineData, "Flavanoids");

  const flavanoidHeaders = formattedFlavanoidData.map(
    (record) => "Class " + record.class
  );
  flavanoidHeaders.unshift("Measures");

  const flavanoidMean: (string | number)[] = ["Flavanoids Mean"];
  const flavanoidMedian: (string | number)[] = ["Flavanoids Median"];
  const flavanoidMode: (string | number)[] = ["Flavanoids Mode"];

  formattedFlavanoidData.forEach((record) => {
    flavanoidMean.push(record.mean_value);
    flavanoidMedian.push(record.median_value);
    flavanoidMode.push(record.mode_value.toString());
  });

  const formattedGammaData = formatGamaData(wineData);

  const gammaHeaders = formattedGammaData.map(
    (record) => "Class " + record.class
  );
  gammaHeaders.unshift("Measures");

  const gammaMean: (string | number)[] = ["Gamma Mean"];
  const gammaMedian: (string | number)[] = ["Gamma Median"];
  const gammaMode: (string | number)[] = ["Gamma Mode"];

  formattedGammaData.forEach((record) => {
    gammaMean.push(record.mean_value);
    gammaMedian.push(record.median_value);
    gammaMode.push(record.mode_value.toString());
  });

  return (
    <div className="App">
      <Table
        tableTitle="Flavanoid Table"
        tableHeaders={flavanoidHeaders}
        meanRows={flavanoidMean}
        medianRows={flavanoidMedian}
        modeRows={flavanoidMode}
      />
      <br />
      <Table
        tableTitle="Gamma Table"
        tableHeaders={gammaHeaders}
        meanRows={gammaMean}
        medianRows={gammaMedian}
        modeRows={gammaMode}
      />
    </div>
  );
}

export default App;
