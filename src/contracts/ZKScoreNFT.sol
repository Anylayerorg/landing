// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ZKScoreNFT
 * @dev ERC721 contract for ZKScore identity NFTs with .zks naming system
 */
contract ZKScoreNFT is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Pricing configuration
    uint256 public normalPrice = 0.1 ether;  // Regular names (4+ chars)
    uint256 public premiumPrice = 1 ether;   // Premium names (1-3 chars)
    bool public mintingEnabled = true;       // Admin can enable/disable minting
    bool public isPaid = true;               // Admin can make minting free
    
    // Maximum supply of NFTs
    uint256 public constant MAX_SUPPLY = 1000000;
    
    // Mapping from name to token ID
    mapping(string => uint256) public nameToTokenId;
    
    // Mapping from token ID to name
    mapping(uint256 => string) public tokenIdToName;
    
    // Mapping to check if a name is taken
    mapping(string => bool) public nameTaken;
    
    // Mapping to check if a name is reserved by admin
    mapping(string => bool) public nameReserved;
    
    // Mapping from owner to list of token IDs
    mapping(address => uint256[]) public ownerTokens;
    
    // Mapping from token ID to owner index
    mapping(uint256 => uint256) public tokenOwnerIndex;
    
    // Events
    event NameRegistered(address indexed owner, uint256 indexed tokenId, string name, uint256 price);
    event NameTransferred(address indexed from, address indexed to, uint256 indexed tokenId, string name);
    event NameReserved(string name, bool reserved);
    event PriceUpdated(uint256 normalPrice, uint256 premiumPrice);
    event MintingStatusChanged(bool enabled);
    event PaymentStatusChanged(bool isPaid);
    
    constructor() ERC721("ZKScore Identity", "ZKID") {}
    
    /**
     * @dev Mint a new ZKScore identity NFT
     * @param name The desired name without .zks suffix (e.g., "alice")
     * @param recipient The address to receive the NFT
     * @param duration Duration in years (1, 3, or 5)
     */
    function mintIdentity(string memory name, address recipient, uint256 duration) 
        external 
        payable 
        nonReentrant 
        returns (uint256) 
    {
        require(mintingEnabled, "Minting is currently disabled");
        require(bytes(name).length >= 1, "Name must be at least 1 character");
        require(bytes(name).length <= 20, "Name must be at most 20 characters");
        require(_isValidName(name), "Invalid name format");
        require(!nameTaken[name], "Name already taken");
        require(!nameReserved[name], "Name is reserved");
        require(_tokenIdCounter.current() < MAX_SUPPLY, "Max supply reached");
        require(duration >= 1 && duration <= 5, "Duration must be 1-5 years");
        
        // Calculate price based on name length and duration
        uint256 basePrice = _isPremiumName(name) ? premiumPrice : normalPrice;
        uint256 totalPrice = isPaid ? basePrice * duration : 0;
        
        require(msg.value >= totalPrice, "Insufficient payment");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        // Register the name
        string memory fullName = string(abi.encodePacked(name, ".zks"));
        nameToTokenId[name] = tokenId;
        tokenIdToName[tokenId] = fullName;
        nameTaken[name] = true;
        
        // Mint the NFT
        _safeMint(recipient, tokenId);
        
        // Add to owner's token list
        ownerTokens[recipient].push(tokenId);
        tokenOwnerIndex[tokenId] = ownerTokens[recipient].length - 1;
        
        // Set metadata URI
        string memory tokenURI = _generateTokenURI(tokenId, fullName);
        _setTokenURI(tokenId, tokenURI);
        
        emit NameRegistered(recipient, tokenId, fullName, totalPrice);
        
        return tokenId;
    }
    
    /**
     * @dev Check if a name is premium (1-3 characters or numeric)
     * @param name The name to check
     */
    function _isPremiumName(string memory name) internal pure returns (bool) {
        bytes memory nameBytes = bytes(name);
        uint256 length = nameBytes.length;
        
        // Single, double, triple character names are premium
        if (length <= 3) {
            return true;
        }
        
        // Check if name is all numeric (any length)
        bool isNumeric = true;
        for (uint256 i = 0; i < length; i++) {
            if (nameBytes[i] < 0x30 || nameBytes[i] > 0x39) { // 0-9 ASCII
                isNumeric = false;
                break;
            }
        }
        
        return isNumeric;
    }
    
    /**
     * @dev Check if a name is premium (external view)
     * @param name The name to check
     */
    function isPremiumName(string memory name) external pure returns (bool) {
        return _isPremiumName(name);
    }
    
    /**
     * @dev Check if a name is available
     * @param name The name to check (without .zks suffix)
     */
    function isNameAvailable(string memory name) external view returns (bool) {
        return !nameTaken[name] && !nameReserved[name] && _isValidName(name);
    }
    
    /**
     * @dev Get the cost to mint an identity
     * @param name The name to check pricing for
     * @param duration Duration in years
     */
    function getMintCost(string memory name, uint256 duration) external view returns (uint256) {
        if (!isPaid) return 0;
        uint256 basePrice = _isPremiumName(name) ? premiumPrice : normalPrice;
        return basePrice * duration;
    }
    
    /**
     * @dev Admin function to reserve/unreserve names
     * @param name The name to reserve/unreserve
     * @param reserved True to reserve, false to unreserve
     */
    function setNameReservation(string memory name, bool reserved) external onlyOwner {
        require(!nameTaken[name], "Name is already taken");
        nameReserved[name] = reserved;
        emit NameReserved(name, reserved);
    }
    
    /**
     * @dev Admin function to batch reserve/unreserve names
     * @param names Array of names to reserve/unreserve
     * @param reserved True to reserve, false to unreserve
     */
    function batchSetNameReservation(string[] memory names, bool reserved) external onlyOwner {
        for (uint256 i = 0; i < names.length; i++) {
            require(!nameTaken[names[i]], "One or more names are already taken");
            nameReserved[names[i]] = reserved;
            emit NameReserved(names[i], reserved);
        }
    }
    
    /**
     * @dev Admin function to update pricing
     * @param _normalPrice New price for normal names (4+ characters)
     * @param _premiumPrice New price for premium names (1-3 characters)
     */
    function updatePricing(uint256 _normalPrice, uint256 _premiumPrice) external onlyOwner {
        normalPrice = _normalPrice;
        premiumPrice = _premiumPrice;
        emit PriceUpdated(_normalPrice, _premiumPrice);
    }
    
    /**
     * @dev Admin function to enable/disable minting
     * @param _enabled True to enable minting, false to disable
     */
    function setMintingEnabled(bool _enabled) external onlyOwner {
        mintingEnabled = _enabled;
        emit MintingStatusChanged(_enabled);
    }
    
    /**
     * @dev Admin function to make minting free/paid
     * @param _isPaid True for paid minting, false for free
     */
    function setPaymentRequired(bool _isPaid) external onlyOwner {
        isPaid = _isPaid;
        emit PaymentStatusChanged(_isPaid);
    }
    
    /**
     * @dev Admin function to withdraw contract balance
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Get all token IDs owned by an address
     * @param owner The owner address
     */
    function getTokensByOwner(address owner) external view returns (uint256[] memory) {
        return ownerTokens[owner];
    }
    
    /**
     * @dev Get the name associated with a token ID
     * @param tokenId The token ID
     */
    function getNameByTokenId(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return tokenIdToName[tokenId];
    }
    
    /**
     * @dev Get the token ID associated with a name
     * @param name The name (without .zks suffix)
     */
    function getTokenIdByName(string memory name) external view returns (uint256) {
        require(nameTaken[name], "Name not registered");
        return nameToTokenId[name];
    }
    
    /**
     * @dev Override transfer to update owner mappings
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        super._beforeTokenTransfer(from, to, tokenId);
        
        if (from != address(0) && to != address(0)) {
            // Remove from previous owner's list
            uint256 tokenIndex = tokenOwnerIndex[tokenId];
            uint256 lastTokenIndex = ownerTokens[from].length - 1;
            
            if (tokenIndex != lastTokenIndex) {
                uint256 lastTokenId = ownerTokens[from][lastTokenIndex];
                ownerTokens[from][tokenIndex] = lastTokenId;
                tokenOwnerIndex[lastTokenId] = tokenIndex;
            }
            
            ownerTokens[from].pop();
            
            // Add to new owner's list
            ownerTokens[to].push(tokenId);
            tokenOwnerIndex[tokenId] = ownerTokens[to].length - 1;
            
            emit NameTransferred(from, to, tokenId, tokenIdToName[tokenId]);
        }
    }
    
    /**
     * @dev Validate name format
     * @param name The name to validate
     */
    function _isValidName(string memory name) internal pure returns (bool) {
        bytes memory nameBytes = bytes(name);
        
        for (uint256 i = 0; i < nameBytes.length; i++) {
            bytes1 char = nameBytes[i];
            
            // Allow a-z, A-Z, 0-9, hyphen, underscore
            if (
                !(char >= 0x30 && char <= 0x39) && // 0-9
                !(char >= 0x41 && char <= 0x5A) && // A-Z
                !(char >= 0x61 && char <= 0x7A) && // a-z
                char != 0x2D && // hyphen
                char != 0x5F    // underscore
            ) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * @dev Generate metadata URI for token
     * @param tokenId The token ID
     * @param fullName The full name with .zks suffix
     */
    function _generateTokenURI(uint256 tokenId, string memory fullName) 
        internal 
        pure 
        returns (string memory) 
    {
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                _base64Encode(
                    bytes(
                        string(
                            abi.encodePacked(
                                '{"name":"', fullName, '",',
                                '"description":"ZKScore Identity NFT for ', fullName, '",',
                                '"image":"https://zkscore.io/api/nft/', tokenId, '/image",',
                                '"attributes":[',
                                '{"trait_type":"Name","value":"', fullName, '"},',
                                '{"trait_type":"Type","value":"ZKScore Identity"}',
                                ']}'
                            )
                        )
                    )
                )
            )
        );
    }
    
    /**
     * @dev Base64 encode function
     */
    function _base64Encode(bytes memory data) internal pure returns (string memory) {
        if (data.length == 0) return "";
        
        string memory table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        uint256 encodedLen = 4 * ((data.length + 2) / 3);
        string memory result = new string(encodedLen + 32);
        
        assembly {
            let tablePtr := add(table, 1)
            let dataPtr := data
            let endPtr := add(dataPtr, mload(data))
            let resultPtr := add(result, 32)
            
            for {} lt(dataPtr, endPtr) {}
            {
               dataPtr := add(dataPtr, 3)
               let input := mload(dataPtr)
               
               mstore8(resultPtr, mload(add(tablePtr, and(shr(18, input), 0x3F))))
               resultPtr := add(resultPtr, 1)
               mstore8(resultPtr, mload(add(tablePtr, and(shr(12, input), 0x3F))))
               resultPtr := add(resultPtr, 1)
               mstore8(resultPtr, mload(add(tablePtr, and(shr( 6, input), 0x3F))))
               resultPtr := add(resultPtr, 1)
               mstore8(resultPtr, mload(add(tablePtr, and(        input,  0x3F))))
               resultPtr := add(resultPtr, 1)
            }
            
            switch mod(mload(data), 3)
            case 1 { mstore(sub(resultPtr, 2), shl(240, 0x3d3d)) }
            case 2 { mstore(sub(resultPtr, 1), shl(248, 0x3d)) }
            
            mstore(result, encodedLen)
        }
        
        return result;
    }
    
    /**
     * @dev Withdraw contract balance (only owner)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Override functions for URI storage
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    /**
     * @dev Get total supply of minted tokens
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
