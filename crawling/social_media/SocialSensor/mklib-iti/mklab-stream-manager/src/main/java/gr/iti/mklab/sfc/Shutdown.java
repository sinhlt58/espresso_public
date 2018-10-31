package gr.iti.mklab.sfc;

import gr.iti.mklab.sfc.streams.StreamException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * Class in case system is shutdown. 
 * Responsible to close all running services
 * 
 * @author Manos Schinas
 *
 */
public class Shutdown extends Thread {
	
	private StreamsManager _manager = null;
	private Logger _logger = LogManager.getLogger(Shutdown.class);
	
	public Shutdown(StreamsManager manager) {
		this._manager = manager;
	}

	public void run() {
		_logger.info("Shutting down stream manager...");
		if (_manager != null) {
			try {
				_manager.close();
			} catch (StreamException e) {
				_logger.error(e);
				e.printStackTrace();
			}
		}
		_logger.info("Done...");
	}
}