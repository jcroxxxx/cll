<?php

/**
 * Description of CottageRates
 *
 * @author jcrox_000
 */
class CottageRates {
    
    private $dao;
    private $response;
    
    /**
     * 
     */
    public function __construct() {
        
        $this->dao = new mysqli("localhost", "root", "", "cll");
        
    }
    
    
    public function getRates() {
        
        $this->response = array();
        
        $select = "SELECT cottageNumber, daily, deposit, fall, occupants, "
			. "spring, summer, winter, winterDaily FROM cottage_rates;";
        
        $result = $this->dao->query($select);
        
        while($row = $result->fetch_assoc()) {
            
            $this->response[$row['cottageNumber']][] = $row;
            
        }
        
        return $this->response;
        
    }
    
}
