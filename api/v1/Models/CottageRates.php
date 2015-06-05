<?php

require_once "DAO.php";

/**
 * Description of CottageRates
 *
 * @author jcrox_000
 */
class CottageRates {
    
	private $conn;
    private $response;
    
    /**
     * 
     */
    public function __construct() {
        
		$dao = new DAO();
		$this->conn = $dao->getConnection();
        
    }
	
	
	public function getCottages() {
		
		$response = array(
			"rates" => $this->getRates(),
			"descrip" => $this->getDescription()
		);
		
		return $response;
		
	}
    
    
    public function getRates() {
        
        $response = array();
        
        $select = "SELECT cottageNumber, daily, deposit, fall, occupants, "
			. "spring, summer, winter, winterDaily FROM cottage_rates;";
        
        $result = $this->conn->query($select);
        
        while($row = $result->fetch_assoc()) {
            
            $response[$row['cottageNumber']][] = $row;
            
        }
        
        return $response;
        
    }
	
	
	public function getDescription() {
		
		$response = array();
		
		$select = "SELECT * FROM cottage_description;";
		$result = $this->conn->query($select);
		while($row = $result->fetch_assoc()) {
			$response[$row['cottageNumber']] = $row;
		}
		
		return $response;
		
	}
	
	
	public function setRates() {
		
		$update = "UPDATE cottage_rates SET daily = $daily,"
		. "deposit = {$_POST['deposit']}, fall = {$_POST['fall']},"
		. "spring = {$_POST['spring']}, summer = {$_POST['summer']},"
		. "winter = {$_POST['winter']}, winterDaily = {$_POST['winterDaily']} "
		. "WHERE cottageNumber = {$_POST['cottageNumber']} "
		. "AND occupants = {$_POST['occupants']};";
		
	}
    
}
