<?php

/**
 * Description of CLLImages
 *
 * @author jcrox_000
 */
class CLLImages {
	
	
	private $dao;
	private $response;
	
	/**
     * 
     */
    public function __construct() {
        
        $this->dao = new mysqli("localhost", "root", "", "cll");
        
    }
	
	
	public function getImages() {
		
		$this->response = array();
		
		$today = intval(date("n").date("d"));
		
		$select = "SELECT * FROM cll_images "
			. "WHERE activeStart <= $today AND activeEnd >= $today;";
		
		$result = $this->dao->query($select);
		
		while($row = $result->fetch_assoc()) {
			
			$this->response[$row['imageId']][$row['relatedId']][] = $row['imagePath']; 
			
		}
		
		return $this->response;
		
	}
	
}