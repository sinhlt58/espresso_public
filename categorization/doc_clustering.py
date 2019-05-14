import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import SVC, LinearSVC
from sklearn.linear_model import SGDClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score
#import matplotlib.pyplot as plt
import io, sys, pickle

def load_data(path):
	with io.open(path, "r", encoding="utf-8") as data_file:
		data = [line.split("\t") for line in data_file.readlines()]
	labels, titles, descriptions, full_texts = zip(*data)
	labels = list(labels)
	features = list(full_texts)
	return features, labels

def create_classifier(structure):
	if(structure == "naive_bayes"):
		module_classifier = MultinomialNB()
	elif(structure == "svm"):
		module_classifier = SVC(verbose=True)
	elif(structure == "linear_svm"):
		module_classifier = LinearSVC(verbose=10, max_iter=1000)
	elif(structure == "linear_sgd"):
		module_classifier = SGDClassifier(verbose=10)
	else:
		raise ValueError("structure unacceptable: {:s}".format(structure))
	return module_classifier

if __name__ == "__main__":
	mode = sys.argv[1]
	train_features, train_labels = load_data("Data/espresso/article_v1/train.tsv")
	eval_features, eval_labels = load_data("Data/espresso/article_v1/dev.tsv")
	# convert related labels into linear_svc compatible
	labels = LabelEncoder().fit(train_labels)
	train_labels = labels.transform(train_labels)
	eval_labels = labels.transform(eval_labels)
	print("Data loaded and labels transformed. List labels: {}".format(labels.classes_))
	# use tf-idf to create ngram/vocab out of the features, and then fit it on multinomial Naive Bayes
#	print(TfidfTransformer.__init__.__code__.co_varnames)
# the ngram is not possible for data, it will overload the count
	module_tfidf = TfidfVectorizer(max_features=100000).fit(train_features) #ngram_range=(2,3), 
	X_train_tfidf = module_tfidf.transform(train_features)
	X_eval_tfidf = module_tfidf.transform(eval_features)
	if(mode == "svm" or mode == "linear_svm"):
		# also, svm apparently need scaling
		scaler = StandardScaler(with_mean=False)
		scaler.fit(X_train_tfidf)
		X_train_tfidf = scaler.transform(X_train_tfidf)
		X_eval_tfidf = scaler.transform(X_eval_tfidf)
		print("Scaling data for svm done.")
	print("Fit+transform features complete, shape: ", X_train_tfidf.shape)
	module_classifier = create_classifier(mode)
	module_classifier = module_classifier.fit(X_train_tfidf, train_labels)
	print("Train with labels complete.")
	# use the built model to perform on the test
	eval_predictions = module_classifier.predict(X_eval_tfidf)
	# calculate the accuracy using labels
	print("Prediction shape: ", np.shape(eval_predictions), np.shape(eval_labels))
	accuracy = np.mean(eval_predictions == eval_labels)
	print("Accuracy score(manual): ", accuracy)
	accuracy = accuracy_score(eval_labels, eval_predictions)
	print("Accuracy score(sklearn): ", accuracy)
	pickle_path = "Data/espresso/{:s}.pickle".format(mode)
	with io.open(pickle_path, "wb") as pickle_file:
		pickle.dump((labels, module_tfidf, module_classifier), pickle_file)

