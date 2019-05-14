import pickle, io, sys
from sklearn.metrics import accuracy_score

if __name__ == "__main__":
	eval_target = sys.argv[1]
	with io.open("linear_sgd.pickle", "rb") as pickle_file:
		module_label, module_tfidf, module_classifier = pickle.load(pickle_file)
	
	print("Read data")
	with io.open(eval_target, "r", encoding="utf-8") as eval_file:
		data = [line.split("\t") for line in eval_file.readlines()]
		labels, _, _, full_texts = zip(*data)
		features, labels = list(full_texts), list(labels)
	
	print("Process data")
	processed_labels = module_label.transform(labels)
	processed_features = module_tfidf.transform(features)
	print("Creating prediction")
	predictions = module_classifier.predict(processed_features)
	
	print("Accuracy_score: ", accuracy_score(processed_labels, predictions))
