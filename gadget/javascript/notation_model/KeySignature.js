/*
Copyright (C) 2013 Jukka Stenlund

This file is part of HymnGadget.

HymnGadget is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

HymnGadget is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with HymnGadget.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * A key signature.
 * @constructor
 * @param {number} sharps The number of sharps or flats in this key signature. Positive values mean
 * sharps, negative values mean flats.
 */
function KeySignature(sharps) {
	this.sharps=sharps;
}

KeySignature.prototype.clone = function() {
	return new KeySignature(this.sharps);
}

KeySignature.prototype.toString = function() {

	var s="Key Signature: ";
	if (this.sharps>0) {
		s+=Math.abs(this.sharps)+" sharps. ";
	}
	else if (this.sharps<0) {
		s+=Math.abs(this.sharps)+" flats. ";
	}
	else {
		s+="No sharps or flats. ";
	}
	s+="As major this would be "+this.getMajorRoot();
	return s;
}

KeySignature.prototype.getABC = function(context) {
    var s="K:";
	var keys=["Cb", "Gb", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#"];
	var sharpOrder=[3, 0, 4, 1, 5, 2, 6];
	var flatOrder=[6, 2, 5, 1, 4, 0, 3];
	var k=this.sharps+7;
	var flats=0;
	var i;
	if (this.sharps<0) {
		flats=Math.abs(this.sharps);
	}
	s+=keys[k]+" major\n";
	for (i=0; i<7; ++i) {
		context.signature[i]=0;
	}
	for (i=0; i<this.sharps; ++i) {
		context.signature[sharpOrder[i]]=1;
	}
	for (i=0; i<flats; ++i) {
		context.signature[flatOrder[i]]=-1;
	}
	
	for (i=0; i<7; ++i) {
		context.tempSharp[i]=context.signature[i];
	}
	
	return s;
}

/**
 * <p>Transposes the root of the major this key signature stands for by specified interval and
 * sets this KeySignature to represent the key signature ot the major key with the transposed root.<p>
 * <p>Let's suppose a KeySignature object represents a key signature with 3 sharps. The
 * major with 3 sharps in the key signature is A major. If transpose method is called on that 
 * KeySignature object
 * with qualified_interval parameter that represents minor 3rd upwards, we can transpose root A 
 * minor 3rd upwards and get C. The key signature of C major has no sharps or flats, so
 * the KeySignature object will represent key signature with no sharps or flats.</p>
 * @param {Interval} qualified_interval The interval this signature should be transponsed.
 */
KeySignature.prototype.transpose = function(qualified_interval) {
	console.log("transposing "+this);
	var majorRoot=this.getMajorRoot();
	console.log("MajorRoot before transposing = "+majorRoot);
	majorRoot.transpose(qualified_interval);
	console.log("MajorRoot after transposing = "+majorRoot);
	this.setMajorRoot(majorRoot);
	console.log("After transposing key signature is "+this);
}

KeySignature.prototype.getMajorRoot = function() {
	var root = [[0,-1],//Cb
	[4,-1],//Gb
	[1,-1],//Db
	[5,-1],//Ab
	[2,-1],//Eb
	[6,-1],//Bb
	[3,0],//F
	[0,0],//C
	[4,0],//G
	[1,0],//D
	[5,0],//A
	[2,0],//E
	[6,0],//B
	[3,1],//F#
	[0,1]];//C#
	var i=this.sharps+7;
	return new Pitch(root[i][0], root[i][1]);
}

KeySignature.prototype.setMajorRoot = function(pitch) {
	var root = [[0,-1],//Cb
	[4,-1],//Gb
	[1,-1],//Db
	[5,-1],//Ab
	[2,-1],//Eb
	[6,-1],//Bb
	[3,0],//F
	[0,0],//C
	[4,0],//G
	[1,0],//D
	[5,0],//A
	[2,0],//E
	[6,0],//B
	[3,1],//F#
	[0,1]];//C#
	var i;
	for (i=0; i<root.length; ++i) {
		if (root[i][0]==reduce(pitch.line) && root[i][1]==pitch.sharps) {
			this.sharps=i-7;
			return;
		}
	}
	console.log("No matches in KeySignature.prototype.setMajorRoot");
	//If we are here, the signature would have more than 7 sharps or flats
}
