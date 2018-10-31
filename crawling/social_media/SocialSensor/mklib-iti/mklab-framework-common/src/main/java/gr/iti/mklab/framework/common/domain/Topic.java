package gr.iti.mklab.framework.common.domain;

public class Topic extends JSONable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4939638671678961023L;

	
	protected String topic;
	
	
	public Topic() {
	
	}

	public Topic(String topic, Double score) {
		this.topic = topic;
		this.score = score;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}
	
}
