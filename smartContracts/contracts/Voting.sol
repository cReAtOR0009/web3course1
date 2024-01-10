// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Election {
    constructor() {}

    struct contestantStruct {
        string name;
        uint256 id;
        uint256 votes;
    }

    struct electionStruct {
        address electionCreator;
        string electionTitle;
        uint256 electionStartDate;
        uint256 electionDuration;
        uint256 electionEndDate;
        string electionStatus;
        contestantStruct[] electionContestants;
    }
    electionStruct[] elections;

    event electionCreated(
        address electionCreator,
        string title,
        uint256 startDate,
        uint256 duration,
        uint256 electionEndDate,
        string status,
        contestantStruct[] contestants
    );

    function createElection(
        string memory title,
        uint256 duration,
        contestantStruct[] memory contestants
    ) public {
        uint256 convertedBlockTime;
        string memory electionStatus;
        uint256 electionEndDate;
        uint256 electionDuration;

        convertedBlockTime = convertToMilli(block.timestamp);
        if ((duration - convertedBlockTime) >= (900 * 1000)) {
            //duration comming from backend must be milliseconds
            electionDuration = (duration - convertedBlockTime);
            electionStatus = "pending";
        } else {
            return;
        }

        elections.push(
            electionStruct(
                msg.sender,
                title,
                convertedBlockTime,
                electionDuration,
                electionEndDate,
                electionStatus,
                contestants
            )
        );
        emit electionCreated(
            msg.sender,
            title,
            block.timestamp,
            electionDuration,
            electionEndDate,
            electionStatus,
            contestants
        );
    }

    function vote()  public  {
        
    }

    function convertToMilli(uint256 timestamp) internal pure returns (uint256) {
        return (timestamp * 1000);
    }
}
