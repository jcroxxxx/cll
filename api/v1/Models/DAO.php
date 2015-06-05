<?php

/**
 * Description of DAO
 *
 * @author jcrox_000
 */
class DAO {
	
	public function getConnection() {
		
		//$conn = new mysqli("localhost", "svc_cll", "", "chief_lake_lodge");
		$conn = new mysqli("localhost", "root", "", "cll");
		
		return $conn;
		
	}
	
	public function getFilteredRates() {
		
		$fields = array("daily", "deposit", "fall", "spring", 
			"summer", "winter", "winterDaily");
		
		$response = array();
		
		foreach($fields as $field) {
			
			$response[$field] = filter_input("INPUT_POST", $field, FILTER_SANITIZE_NUMBER_FLOAT);
			
		}
		
	}
	
}
