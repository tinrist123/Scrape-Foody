const restaurant = require("../../models/restaurant");

const TfIdf = require("natural").TfIdf;
const Vector = require("vector-object");

const getRecommendRestaurant = async (req, res) => {
  try {
    const { restaurant_ID } = req.params;
    const allRestaurant = await restaurant.find({});
    let formatedData = formatData(allRestaurant);
    let documentVector = createVectorsFromDocs(formatedData);
    let similaritiesData = calcSimilarities(documentVector);
    let data = await getListRelatedRestaurant(similaritiesData, restaurant_ID);
    if (allRestaurant)
      res.status(200).send({ data: data });
  }
  catch (error) {
    res.status(404).send({ error: error.message });
  }
}

const formatData = data => {
  let formatted = [];
  //console.log(data)
  for (var e of data) {
    // console.log(e)
    tmpObj = {
      id: String(e._id),
      content: (e.short_description == null ? "" : e.short_description) + " " + e.name + " " + e.address_detail
    };
    formatted.push(tmpObj);
  }

  return formatted;
};

const createVectorsFromDocs = processedDocs => {
  const tfidf = new TfIdf();

  processedDocs.forEach(processedDocument => {
    tfidf.addDocument(processedDocument.content);
  });

  const documentVectors = [];

  for (let i = 0; i < processedDocs.length; i += 1) {
    const processedDocument = processedDocs[i];
    const obj = {};

    const items = tfidf.listTerms(i);

    for (let j = 0; j < items.length; j += 1) {
      const item = items[j];
      obj[item.term] = item.tfidf;
    }

    const documentVector = {
      id: processedDocument.id,
      vector: new Vector(obj)
    };

    documentVectors.push(documentVector);
  }

  return documentVectors;
}

const calcSimilarities = docVectors => {
  // number of results that you want to return.
  const MAX_SIMILAR = 20;
  // min cosine similarity score that should be returned.
  const MIN_SCORE = 0.2;
  const data = {};

  for (let i = 0; i < docVectors.length; i += 1) {
    const documentVector = docVectors[i];
    const { id } = documentVector;

    data[id] = [];
  }

  for (let i = 0; i < docVectors.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      const idi = docVectors[i].id;
      const vi = docVectors[i].vector;
      const idj = docVectors[j].id;
      const vj = docVectors[j].vector;
      const similarity = vi.getCosineSimilarity(vj);

      if (similarity > MIN_SCORE) {
        data[idi].push({ id: idj, score: similarity });
        data[idj].push({ id: idi, score: similarity });
      }
    }
  }

  // finally sort the similar documents by descending order
  Object.keys(data).forEach(id => {
    data[id].sort((a, b) => b.score - a.score);

    if (data[id].length > MAX_SIMILAR) {
      data[id] = data[id].slice(0, MAX_SIMILAR);
    }
  });

  return data;
}

// const getLength = () => {
//   let l = 0;

//   this.getComponents().forEach(k => {
//     l += this.vector[k] * this.vector[k];
//   });

//   return Math.sqrt(l);
// }

// const getCosineSimilarity = (vector) => {
//   //return this.getDotProduct(vector) / (this.getLength() * vector.getLength());
// }

const getListRelatedRestaurant = async (data, key) => {
  if(data.hasOwnProperty(key)){
    return await getListRecommendRestaurant(data[key])
  }
}

const getListRecommendRestaurant = async (data) => {
  var list = [];
  for(let restaurant of data){
    let resta = await getRestaurantById(restaurant.id);
    list.push(resta)
  }
  console.log(list)
  return list;
}

const getRestaurantById = async (id) => {
  let restau = await restaurant.find({ _id: id })
  .populate("province_id")
  .populate("district_id");
  if(restau) return restau[0];
  return null;
}

module.exports = getRecommendRestaurant;