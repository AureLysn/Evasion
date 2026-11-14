// ==UserScript==
// @name         Wikicv Library & Bookmarks Archiver
// @namespace    https://github.com/BaoBao666888/
// @version      0.4.0-aurelysn
// @description  Quét, lưu, xem và xuất thư viện/bookmarks Wikicv; hỗ trợ Đang đọc, Yêu thích, checkpoint và tên/tác giả Việt-Trung.
// @author       QuocBao (giao diện bảng chung: Aurel)
// @icon         data:image/x-icon;base64,AAABAAEAQEAAAAEAIAAoQgAAFgAAACgAAABAAAAAgAAAAAEAIAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAADaxiYA2sYmAdrGJnPaxibZ2sYm+9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJvzaxibf2sYmgNrGJgbaxiYA2sYmAtrGJpzaxib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axiaw2sYmCNrGJm3axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJn/axibd2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axibl2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axiT/2cUg/9jDG//Ywxr/2MMZ/9jDGf/Ywxr/2cQd/9rFIv/axiX/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJf/axSL/2cQd/9jDGv/Ywxn/2MMZ/9jDGf/Ywxv/2cQe/9rFI//axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2cUi/9jDGv/Ywxr/28cp/+DORf/l12X/6dx6/+vgh//r4If/6Nt1/+PTVv/dyjT/2cQe/9jDGf/ZxB//2sYm/9rGJv/axib/2sYm/9rGJv/axiT/2cQd/9jDGf/ZxSD/3cs3/+PUWv/o3Hf/6+CH/+vgh//q3oH/5tls/+HRT//cyC7/2cQc/9jDGf/ZxSD/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/ZxSD/2MMa/93LN//n2nL/8eqt//n23P/+/vr//////////////////////////////////Prs//Xvw//r4In/4M9G/9nEHf/ZxB3/2sYm/9rGJP/Ywxr/2sYm/+LTVf/t45L/9vHI//377v//////////////////////////////////////+/jk//PtuP/p3n//381B/9nEHP/ZxB7/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJf/Ywxj/3sw7/+/moP/9++7///////////////////////////////////////////////////////////////////////7++f/z7bf/4dFN/9jCF//axiX/6d16//j01f////////////////////////////////////////////////////////////////////////////799f/y67L/4M9I/9jDGP/axiT/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYn/9nFIf/ZxR//6d19//z77P/////////////////////////////////////////////////////////////////////////////////////////////++//w56T/9/LN//////////////////////////////////////////////////////////////////////////////////////////////////799v/s4Yr/2sYj/9nEH//axif/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYn/9nEH//byCz/8+yz//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Xww//dyzj/2cQc/9rGJ//axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYn/9nEHv/cyS//9/LN//////////////////////////////////////////////////389P/7+OT/+PXX//n12P/8+un////9///////////////////////////////////////////////////////////////////////////////9//z66//59tz/+PTV//r33//8++7/////////////////////////////////////////////////+vji/+HQSf/Zwxv/2sYn/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9nFIP/cyS//9/LN///////////////////////////////////////59tv/7eOS/+PUWv/ezDv/3Mgt/9rGJf/axib/3Mkx/+DQSf/p3Xr/9vHI//////////////////////////////////////////////////799f/z7LX/6Ntz/+DQSf/cyTL/28co/9rGJP/bxyr/3co1/+LSUP/r34X/9/PQ///////////////////////////////////////7+ej/385C/9nEHf/axif/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJP/ZxR//9O68//////////////////////////////////r44v/o23X/28co/9jCGP/ZxBz/2cUh/9rGI//axiX/2sYk/9rFI//ZxB//2MMY/9nFIP/k1V//9vLL/////////////////////////////v76/+/mnv/fzT//2MMb/9jDGf/ZxB//2sUj/9rGJP/axiX/2sYk/9rFIv/ZxB7/2MMY/9rFIv/l1mP/+fXX//////////////////////////////////n12P/byCv/2sUi/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/Ywxj/6t6B//////////////////////////////////Pstv/cyjL/2MMX/9rGJP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axiX/2MMa/9rFIv/r4Ib//fvv////////////+fXY/+LSUf/Ywxf/2cUf/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axiX/2MMZ/9vIKf/w6KX/////////////////////////////////8emr/9jDGv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/ZxSD/380///788/////////////////////////////Hpqf/ZxB7/2cUg/9rGJ//axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axSH/2MMX//bwxf//////9e/A/9zJLf/Zwxv/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axSL/2MMa/+zhiv/////////////////////////////////m2Gf/2cQa/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2MMa//Hpqf////////////////////////////PstP/ZxB7/2sUi/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2MMZ/+3jkv//////9fDE/9rGJv/ZxR//2sYn/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJP/Ywxf/7uSW////////////////////////////+vfh/9vIKv/axiP/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sUh/97MO//+/fX///////////////////////r44f/cyS7/2cUg/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2cQc/+PTVf////7/+/jj/93KMv/ZxB7/2sYn/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYj/9nFHv/178H////////////////////////////p3Xv/2MMZ/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9jDGv/o3Hf////////////////////////////n2m//2MMY/9rGJ//axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYl/9rFIv/388///////+TWYP/Ywxn/2sYn/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/ZxB7/381A//388///////////////////////+PTS/9rFIv/axiX/2sYm/9rGJv/axib/2sYm/9rGJv/ZxBv/8+y2///////////////////////59tv/2sYm/9rGJP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axSP/2cUh/9rFIv/axiX/2sYm/9nEG//m12b///////Pstf/Ywxr/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sUj/9nFIf/ZxSL/2sYl/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9jDF//u5Zr//////////////////////////P/gz0j/2cUf/9rGJv/axib/2sYm/9rGJv/axiT/3Mgs//v45P//////////////////////7eKR/9jDGP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rFI//Ywxv/3Mkv/97MPv/dyzf/2cQf/9nEHv/ZxB3/9e/C///////h0U7/2cQd/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axiP/2MMa/9zILv/ezD7/3cs4/9nEH//ZxB7/2sYn/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/ZxSD/381A//799v//////////////////////6d5+/9jDGf/axib/2sYm/9rGJv/axib/2cQe/+HRTv////7//////////////////////+LSU//ZxB3/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rFIv/bxyj/7uSW//v45P/+/fb//fvv//Tuu//fzkL/3co0///++//38sv/2cQe/9rGJf/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axSL/28cn/+3jlP/7+OP//v32//378P/07r3/4dBK/9nEHP/axif/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9nEHf/28MX///////////////////////Lrs//ZxBv/2sYm/9rGJv/axib/2sYm/9jDGv/o23b///////////////////////z67P/cyjL/2sYj/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJf/axSD/8+23////////////////////////////+/nl/+3jk///////6t5+/9jDGf/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axiX/2cUg//PstP////////////////////////////377//gz0X/2cUf/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/Ywxj/7eKP///////////////////////59tz/28cn/9rGJP/axib/2sYm/9rGJv/Ywxn/7uSZ///////////////////////489D/2sUi/9rGJf/axib/2sYm/9rGJv/axib/2sYm/9rGJv/ZxBv/5tlr///////////////////////////////////////////////8/+HQSf/ZxR//2sYm/9rGJv/axib/2sYm/9rGJv/axib/2cQb/+bYaP//////////////////////////////////////9O69/9nEHf/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2MMb/+bYaf///////////////////////fzz/97MOv/axSH/2sYm/9rGJv/axib/2MMb//LqsP//////////////////////9O26/9jDHP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2cQe//XwxP////////////////////////////////////////////v55v/cyC3/2sYj/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9nEHf/177/////////////////////////////////////////+/P/gz0f/2cUf/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9nEHv/i01T///////////////////////7++//fzkT/2cUg/9rGJv/axib/2sYm/9nEHf/07r////////////////////////Dopv/Ywxn/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sUi/93LNv/9/PH////////////////////////////////////////////38s3/2sUh/9rGJf/axib/2sYm/9rGJv/axib/2sYm/9rFIv/dyjT//fvu////////////////////////////////////////////6dx5/9jDGv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/ZxB7/4tJT///////////////////////+/vr/385D/9nFIP/axib/2sYm/9rGJv/ZxB3/9O6////////////////////////v56H/2MMZ/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9nEHv/i0lD/////////////////////////////////////////////////9O69/9nEHf/axib/2sYm/9rGJv/axib/2sYm/9rGJv/ZxB7/4dFO/////////////////////////////////////////////////+/mnf/Ywxn/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2cQe/+LSU////////////////////////v76/9/OQ//ZxSD/2sYm/9rGJv/axib/2cQd//Tuv///////////////////////7+ei/9jDGf/axib/2sYm/9rGJv/axib/2sYm/9rGJv/ZxBz/5ddl//////////////////////////////////////////////////Ptuf/ZxBz/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2cQc/+XWY//////////////////////////////////////////////////z7LX/2cQb/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9nEHv/i0lP///////////////////////7++v/fzkP/2cUg/9rGJv/axib/2sYm/9nEHf/07r///////////////////////+/nov/Ywxn/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2MMb/+bZa//////////////////////////////////////////////////z7bn/2MQc/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9jDG//n2Gn/////////////////////////////////////////////////9e68/9nEHP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/ZxB7/4tJT///////////////////////+/vr/385D/9nFIP/axib/2sYm/9rGJv/ZxB3/9O6////////////////////////v56L/2MMZ/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9jDG//m2Gr/////////////////////////////////////////////////8+25/9jEHP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/Ywxv/5tdo//////////////////////////////////////////////////Ttu//ZxBz/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2cQe/+LSU////////////////////////v76/9/OQ//ZxSD/2sYm/9rGJv/axib/2cQd//Tuv///////////////////////7+ei/9jDGf/axib/2sYm/9rGJv/axib/2sYm/9rGJv/Ywxv/5thq//////////////////////////////////////////////////Ptuf/YxBz/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2MMb/+bXaP/////////////////////////////////////////////////07bv/2cQc/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9nEHv/i0lP///////////////////////7++v/fzkP/2cUg/9rGJv/axib/2sYm/9nEHf/07r///////////////////////+/nov/Ywxn/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2MMb/+bYav/////////////////////////////////////////////////z7bn/2MQc/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9jDG//m12j/////////////////////////////////////////////////9O27/9nEHP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/ZxB7/4tJT///////////////////////+/vr/385D/9nFIP/axib/2sYm/9rGJv/ZxB3/9O6////////////////////////v56L/2MMZ/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9jDG//m2Gr/////////////////////////////////////////////////8+25/9jEHP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/Ywxv/5tdo//////////////////////////////////////////////////Ttu//ZxBz/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2cQe/+LSU////////////////////////v76/9/OQ//ZxSD/2sYm/9rGJv/axib/2cQd//Tuv///////////////////////7+ei/9jDGf/axib/2sYm/9rGJv/axib/2sYm/9rGJv/Ywxv/5thq//////////////////////////////////////////////////Ptuf/YxBz/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2MMb/+bXaP/////////////////////////////////////////////////07bv/2cQc/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9nEHv/i0lP///////////////////////7++v/fzkP/2cUg/9rGJv/axib/2sYm/9nEHf/07r///////////////////////+/nov/Ywxn/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2MMb/+bYav/////////////////////////////////////////////////z7bn/2MQc/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9jDG//m12j/////////////////////////////////////////////////9O27/9nEHP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/ZxB7/4tJT///////////////////////+/vr/385D/9nFIP/axib/2sYm/9rGJv/ZxB3/9O6////////////////////////v56L/2MMZ/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9jDG//m2Gr/////////////////////////////////////////////////8+25/9jEHP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/Ywxv/5tdo//////////////////////////////////////////////////Ttu//ZxBz/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2cQe/+LSU////////////////////////v76/9/OQ//ZxSD/2sYm/9rGJv/axib/2cQd//Tuv///////////////////////7+ei/9jDGf/axib/2sYm/9rGJv/axib/2sYm/9rGJv/Ywxv/5thq//////////////////////////////////////////////////Ptuf/YxBz/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2MMb/+bXaP/////////////////////////////////////////////////07bv/2cQc/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9nEHv/i0lP///////////////////////7++v/fzkP/2cUg/9rGJv/axib/2sYm/9nEHf/07r///////////////////////+/nov/Ywxn/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2MMb/+bYav/////////////////////////////////////////////////z7bn/2MQc/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9jDG//m12j/////////////////////////////////////////////////9O27/9nEHP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/ZxB7/4tJT///////////////////////+/vr/385D/9nFIP/axib/2sYm/9rGJv/ZxB3/9O6////////////////////////v56L/2MMZ/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9jDG//m2Gr/////////////////////////////////////////////////8+25/9jEHP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/Ywxv/5tdo//////////////////////////////////////////////////Ttu//ZxBz/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2cQe/+LSU////////////////////////v76/9/OQ//ZxSD/2sYm/9rGJv/axib/2cQd//Tuv///////////////////////7+ei/9jDGf/axib/2sYm/9rGJv/axib/2sYm/9rGJv/Ywxv/5thq//////////////////////////////////////////////////Ptuf/YxBz/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2MMb/+bXaP/////////////////////////////////////////////////07bv/2cQc/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9nEHv/i0lP///////////////////////7++v/fzkP/2cUg/9rGJv/axib/2sYm/9nEHf/07r///////////////////////+/nov/Ywxn/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2MMb/+bYav/////////////////////////////////////////////////z7bn/2MQc/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9jDG//m12j/////////////////////////////////////////////////9O27/9nEHP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/ZxB7/4tJT///////////////////////+/vr/385D/9nFIP/axib/2sYm/9rGJv/ZxB3/9O6////////////////////////v56L/2MMZ/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9jDG//m2Gr/////////////////////////////////////////////////8+25/9jEHP/axib/2sYm/9rGJv/axib/2sYm/9rGJv/Ywxv/5tdo//////////////////////////////////////////////////Ttu//ZxBz/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2cQe/+LSU////////////////////////v76/9/OQ//ZxSD/2sYm/9rGJv/axib/2cQd//Tuv///////////////////////7+ei/9jDGP/axiX/2sYl/9rGJf/axiX/2sYl/9rGJf/Ywxr/5thq//////////////////////////////////////////////////Ptuf/YxBv/2sYl/9rGJf/axiX/2sYl/9rGJf/axiX/2MMa/+bXaP/////////////////////////////////////////////////07bv/2cQb/9rGJf/axiX/2sYl/9rGJf/axiX/2sYl/9nEHf/i0lP///////////////////////7++v/fzkP/2cUg/9rGJv/axib/2sYm/9nEHf/078D//////////////////////+/mn//XwRL/2cQf/9nEH//ZxB//2cQf/9nEH//ZxB//18EU/+XXZv/////////////////////////////////////////////////z7bf/18IV/9nEH//ZxB//2cQf/9nEH//ZxB//2cQf/9fBFP/l1mP/////////////////////////////////////////////////9O25/9jCFf/ZxB//2cQf/9nEH//ZxB//2cQf/9nEH//Ywhf/4dFO///////////////////////+/vv/385E/9nFIP/axib/2sYm/9rGJv/ZxBz/8+25///////////////////////7+ej/9fDE//bxyP/28cj/9vHI//bxyP/28cj/9vHI//Xwxf/59dn//////////////////////////////////////////////////Pvt//Xwxf/28cj/9vHI//bxyP/28cj/9vHI//bxyP/18MX/+fXZ//////////////////////////////////////////////////z77v/28MX/9vHI//bxyP/28cj/9vHI//bxyP/28cj/9vDG//j00////////////////////////v73/9/NP//ZxSH/2sYm/9rGJv/axib/2MMZ/+zijf/////////////////////////////////////////////////////////////////////////////////////////////////+/ff//////////////////////////////////////////////////////////////////////////////////////////////////v33//////////////////////////////////////////////////////////////////////////////////////////////////n22//bxib/2sYk/9rGJv/axib/2sYm/9nEHv/i0U/////+////////////////////////////////////////////////////////////////////////////////////////////7eOT//z66////////////////////////////////////////////////////////////////////////////////////////////+7klv/7+eb////////////////////////////////////////////////////////////////////////////////////////////v5pz/2MMa/9rGJv/axib/2sYm/9rGJv/axib/2cQb/+3klf//////////////////////////////////////////////////////////////////////////////////////9fDD/9jDGf/p3Xz///////////////////////////////////////////////////////////////////////////////////////bxyP/ZxBv/6Nt1///////////////////////////////////////////////////////////////////////////////////////59tr/3Mkv/9rFIv/axib/2sYm/9rGJv/axib/2sYm/9rGJP/axSH/6+CJ//378P///////////////////////////////////////////////////////////////////vz/8uqu/9zILv/ZxSD/2cQd/+ncef/8+uz////////////////////////////////////////////////////////////////////9//Lqr//cyS//2cUg/9nEHf/o3Hj//Prr/////////////////////////////////////////////////////////////////////v/07rv/3sw5/9nEHv/axif/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYk/9jDG//ezDv/5thp/+3jkv/u5Jj/7uSY/+7kmP/u5Jj/7uSY/+7kmP/u5Jj/7uSY/+7kl//o3Hj/4M9I/9nEH//axSH/2sYn/9rGJf/Ywxv/3cs3/+XXZ//t45H/7uSY/+7kmP/u5Jj/7uSY/+7kmP/u5Jj/7uSY/+7kmP/u5Jf/6dx6/+DQSv/ZxB//2cUh/9rGJ//axiX/2MMb/93LNv/l12X/7eKQ/+7kmP/u5Jj/7uSY/+7kmP/u5Jj/7uSY/+7kmP/u5Jj/7uSY/+ndfP/h0Ez/2sUi/9nFH//axif/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2cUh/9jDG//Ywxn/2MMZ/9jDGf/Ywxn/2MMZ/9jDGf/Ywxn/2MMZ/9jDGf/Ywxn/2MMa/9nEH//axiX/2sYm/9rGJv/axib/2sYm/9rFIv/Ywxv/2MMZ/9jDGf/Ywxn/2MMZ/9jDGf/Ywxn/2MMZ/9jDGf/Ywxn/2MMZ/9jDGv/ZxB//2sYl/9rGJv/axib/2sYm/9rGJv/axSL/2cQc/9jDGf/Ywxn/2MMZ/9jDGf/Ywxn/2MMZ/9jDGf/Ywxn/2MMZ/9jDGf/Ywxr/2cQf/9rGJf/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv7axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv7axibW2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axibf2sYmX9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYmcdrGJgDaxiaH2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYmnNrGJgPaxiYA2sYmANrGJmHaxibR2sYm+trGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJv/axib/2sYm/9rGJvzaxibX2sYmb9rGJgDaxiYAgAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAwAAAAAAAAAM=
// @match        https://wikicv.org/user/*/thu-vien*
// @match        https://wikicv.org/user/*/bookmarks*
// @match        https://wikicv.net/user/*/thu-vien*
// @match        https://koanchay.org/user/*/thu-vien*
// @match        https://truyenwikidich.net/user/*/thu-vien*
// @match        https://koanchay.net/user/*/thu-vien*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// ==/UserScript==
//
// Bản AureLysn của "Wikicv Library & Bookmarks Archiver" 0.3.0 (QuocBao,
// BaoBao666888/Novel-Downloader5 — không có licence; giữ trong repo private, xem README).
// 0.4.0-aurelysn — chỉ đổi phần vỏ, lõi quét / lưu / xuất giữ nguyên:
//  - Bảng nằm trong tab "Thư viện" của bảng chung (shared/ui-kit.js), theo bản thiết kế
//    00_Layout; bộ màu wikicv tối / sáng của bảng chung. Bỏ nút nổi LIB/BM và tiêu đề riêng.
//  - Nút "?" của bảng chung mở hướng dẫn; "✕" dừng lượt quét đang chạy.
//  - Bỏ @updateURL / @downloadURL: để Tampermonkey không tự kéo bản gốc về đè bản này.

(function() {
    'use strict';

// <aurel-ui-kit>
/* =============================================================================
 * AUREL UI KIT — giao diện chung của các userscript chạy trên cùng một trang.
 *
 * Bản gốc: userscripts/shared/ui-kit.js. Khối này được CHÉP NGUYÊN vào từng script
 * (giữa hai dòng đánh dấu aurel-ui-kit) bằng:   node userscripts/shared/sync.js
 * Đừng sửa bản chép — sửa bản gốc rồi chạy lại lệnh trên.
 *
 * Ba userscript là ba sandbox, không gọi hàm của nhau được; thứ duy nhất dùng chung là
 * DOM. Nên mọi quy ước nằm trong DOM, và script nào chạy trước thì dựng khung:
 *
 *   #aurel-dock                       góc phải dưới: [.side][.col]
 *     .side                           chỗ cho mini-player (TTS Reader), nằm bên trái cột nút
 *     .col > [data-slot="<id>"]       cột nút tròn, xếp từ dưới lên — order: tm 10 · ndl 20 · tts 30
 *   #aurel-hub[data-active="<id>"]    MỘT cửa sổ, mỗi script một tab; display:none = thu lại
 *     .tabs > button.tab[data-tab]    order: tts 10 · ndl 20 · tm 30
 *     .panes > [data-pane]            mỗi script tự dựng giao diện trong ngăn của mình
 *
 * Sự kiện trên document (detail là chuỗi — object không qua được ranh giới sandbox):
 *   'aurel-hub:change'  detail = id tab đang mở, hoặc '' khi bảng thu lại
 *   'aurel-hub:help'    detail = id tab đang mở lúc bấm nút "?"
 *   'aurel-hub:close'   detail = id tab đang mở lúc bấm nút "✕" (bảng tự thu lại sau đó)
 *
 * Màu: mỗi trang web một bộ màu riêng (KIT_SITES — Lofter xanh ngọc, STV xanh dương, wikicv
 * cyan, AO3 đỏ, FanFiction tím, Wattpad cam, Tấn Giang xanh lá; theo bản thiết kế 00_Layout của Aurel), mỗi bộ
 * có bản tối và bản sáng. Trang nào thì kit tự nhận theo tên miền — ba script trên cùng trang
 * luôn ra cùng một bộ.
 *
 * Khung riêng nằm ngoài #aurel-hub / #aurel-dock (vd. bảng toàn trang của Name Desk) gắn
 * thuộc tính data-aurel-skin lên host rồi gọi kitThemeApply() là nhận cùng bộ màu.
 *
 * Theme (tối · sáng · theo hệ thống): nút thứ nhất ở góc phải thanh tab. Lựa chọn nằm trong
 * localStorage của trang (khóa 'aurel-ui-theme' — ba sandbox đọc chung được, nhưng nhớ riêng
 * từng trang web). Bộ màu đang dùng được đặt thành biến --kt-* ngay trên #aurel-hub và
 * #aurel-dock; mọi shadow root bên trong thừa kế chúng qua KIT_TOKENS, nên script nào bấm nút
 * thì giao diện của cả ba cùng đổi. Không có --kt-* (host đứng ngoài hai khung đó) = Lofter tối.
 *
 * Trong ngăn của mình, script gắn một shadow root với KIT_CSS để có cùng bộ thẻ:
 *   .card (+ h4) · .row · .grow · .btn (.pri .sec .warn .dan) · input/select/textarea
 *   label.ck · label.sw (công tắc) · .lb · .hint · details.adv · .console · .bar
 *
 * Tên biến màu giữ từ bản trước để code các tab không phải đổi: --k-teal là màu CHÍNH của
 * trang (không nhất thiết xanh ngọc), --k-green là màu PHỤ, --k-yellow / --k-red là tạm dừng /
 * nguy hiểm. --k-on là chữ trên nút màu, --k-ink là chữ trên tab đang mở.
 * ========================================================================== */
function kitGrad(a, b) { return 'linear-gradient(135deg,' + a + ' 0%,' + b + ' 100%)'; }
function kitBg(a, b) { return 'linear-gradient(170deg,' + a + ' 0%,' + b + ' 100%)'; }
// Bộ tối của Lofter: cũng là màu dự phòng trong KIT_TOKENS, nên phải có ĐỦ mọi khóa.
var KIT_DARK = {
    text: '#e8f4f2', muted: '#93b2b0', line: 'rgba(160,215,208,.2)', edge: 'rgba(160,215,208,.36)',
    win: kitBg('#20424a', '#16323a'), card: kitBg('#25494f', '#1d3e45'), field: '#0b2227',
    soft: '#2a555d', softx: '#e8f4f2', sunk: 'rgba(0,0,0,.18)', pill: '#17343a', shadow: 'rgba(0,0,0,.45)',
    teal: kitGrad('#3be6c5', '#14bf9f'), green: kitGrad('#7fe0a8', '#3cc27f'),
    yellow: kitGrad('#f1e06a', '#dcc12f'), red: kitGrad('#f59a8f', '#e5685e'),
    accent: '#2bd8b8', ink: '#053a33', on: '#ffffff', ong: '#ffffff', ony: '#ffffff', onr: '#ffffff', link: '#7fe9d6', err: '#ffa79b', ok: '#7ff0c0', scheme: 'dark'
};
// Mỗi bộ chỉ ghi phần khác bộ gốc của nó (tối → KIT_DARK, sáng → KIT_SITES.lofter.light).
var KIT_SITES = {
    lofter: {
        dark: {},
        light: {
            text: '#173a37', muted: '#5f7d7a', line: 'rgba(20,90,80,.15)', edge: 'rgba(20,90,80,.24)',
            win: kitBg('#f6fbfa', '#eaf4f2'), card: kitBg('#ffffff', '#f1f7f6'), field: '#ffffff',
            soft: '#dcebe9', softx: '#173a37', sunk: 'rgba(20,90,80,.05)', pill: '#ffffff', shadow: 'rgba(30,70,65,.22)',
            teal: kitGrad('#34dcc0', '#12b99d'), green: kitGrad('#7fdca5', '#38bb79'),
            yellow: kitGrad('#f6d454', '#e9b52c'), red: kitGrad('#f79085', '#ec6a5f'),
            accent: '#14b99c', link: '#0c7f70', err: '#c0392b', ok: '#12805c', scheme: 'light'
        }
    },
    stv: {
        dark: {
            text: '#e7ecf8', muted: '#95a2c2', line: 'rgba(150,170,220,.18)', edge: 'rgba(150,170,220,.32)',
            win: kitBg('#1f2944', '#161e33'), card: kitBg('#2b3657', '#232d4a'), field: '#0b111f',
            soft: '#334268', softx: '#e7ecf8', pill: '#1a233a', shadow: 'rgba(0,0,0,.5)',
            teal: kitGrad('#5a84ea', '#2a50c4'), green: kitGrad('#38c0a0', '#249a80'),
            yellow: kitGrad('#f3cb66', '#e3aa3c'), red: kitGrad('#ea6f84', '#d1475f'),
            accent: '#4a76e6', ink: '#ffffff', link: '#8fb0ff', err: '#ff9aa8', ok: '#6fe0b8'
        },
        light: {
            text: '#1a2541', muted: '#64739a', line: 'rgba(40,70,140,.13)', edge: 'rgba(40,70,140,.22)',
            win: kitBg('#f9fbff', '#eef3fc'), card: kitBg('#ffffff', '#f5f8fe'), field: '#fbfcfe',
            soft: '#dde6f7', softx: '#1a2541', sunk: 'rgba(40,70,140,.05)', pill: '#ffffff', shadow: 'rgba(30,50,100,.2)',
            teal: kitGrad('#6492f8', '#3467e5'), green: kitGrad('#3fd3ae', '#22ad8b'),
            yellow: kitGrad('#fcd463', '#f4b73f'), red: kitGrad('#f9879a', '#ee5b74'),
            accent: '#4479f0', ink: '#ffffff', link: '#2f5fd6', err: '#d23a52', ok: '#128a63', scheme: 'light'
        }
    },
    wikicv: {
        dark: {
            text: '#e6f3f8', muted: '#8fb2c2', line: 'rgba(140,205,230,.18)', edge: 'rgba(140,205,230,.32)',
            win: kitBg('#1d3c51', '#142d3e'), card: kitBg('#20475a', '#193a4c'), field: '#081c26',
            soft: '#27556b', softx: '#e6f3f8', pill: '#143042',
            teal: kitGrad('#55e0f0', '#17aac6'), green: kitGrad('#8fd0f6', '#4fa6e6'),
            accent: '#36c3da', ink: '#06344a', link: '#7fdcf0'
        },
        light: {
            text: '#12303f', muted: '#5f7d8c', line: 'rgba(20,80,110,.14)', edge: 'rgba(20,80,110,.22)',
            win: kitBg('#f3f8fc', '#e8f1f7'), card: kitBg('#ffffff', '#f3f8fb'), field: '#f9fbfd',
            soft: '#d8e8f1', softx: '#12303f', sunk: 'rgba(20,80,110,.05)', pill: '#ffffff', shadow: 'rgba(20,60,90,.2)',
            teal: kitGrad('#5ad8f0', '#26b9de'), green: kitGrad('#9fd6f8', '#5aaeea'),
            yellow: kitGrad('#f8da5e', '#eebd33'), red: kitGrad('#fb9c8f', '#f07465'),
            accent: '#22b5d8', ink: '#06344a', link: '#0f7fa6', err: '#c0392b', ok: '#12805c', scheme: 'light'
        }
    },
    ao3: {
        dark: {
            text: '#eeeeee', muted: '#a0a0a0', line: 'rgba(255,255,255,.09)', edge: 'rgba(255,255,255,.17)',
            win: kitBg('#1e1e1e', '#141414'), card: kitBg('#2a2a2a', '#232323'), field: '#0a0a0a',
            soft: '#333333', softx: '#eeeeee', pill: '#1b1b1b', shadow: 'rgba(0,0,0,.55)',
            teal: kitGrad('#c4524f', '#901f1e'), green: kitGrad('#8f949e', '#6b707a'),
            yellow: kitGrad('#e2c06a', '#c99c3c'), red: kitGrad('#b85068', '#8a3148'),
            accent: '#c0403c', ink: '#ffffff', link: '#ff9c95', err: '#ff8a80', ok: '#8fd6a0'
        },
        light: {
            text: '#2b2020', muted: '#7c7070', line: 'rgba(80,30,30,.11)', edge: 'rgba(80,30,30,.2)',
            win: kitBg('#fefdfd', '#f5f1f1'), card: kitBg('#ffffff', '#faf8f8'), field: '#ffffff',
            soft: '#ebe6e6', softx: '#2b2020', sunk: 'rgba(80,30,30,.04)', pill: '#ffffff', shadow: 'rgba(60,20,20,.18)',
            teal: kitGrad('#cc5552', '#9d201f'), green: kitGrad('#8e939d', '#6f747e'),
            yellow: kitGrad('#e8c66e', '#d2a444'), red: kitGrad('#c45a72', '#a23d55'),
            accent: '#b0302d', ink: '#ffffff', link: '#a0201f', err: '#b3261e', ok: '#2e7d4f', scheme: 'light'
        }
    },
    ffn: {
        dark: {
            text: '#ececf3', muted: '#9d9fb0', line: 'rgba(255,255,255,.09)', edge: 'rgba(255,255,255,.17)',
            win: kitBg('#1e2025', '#15171b'), card: kitBg('#2c2f36', '#25282e'), field: '#0a0b0d',
            soft: '#363944', softx: '#ececf3', pill: '#1a1c21', shadow: 'rgba(0,0,0,.55)',
            teal: kitGrad('#7576da', '#4143aa'), green: kitGrad('#7a7f8c', '#5a5e69'),
            yellow: kitGrad('#ebcc75', '#d4ab4a'), red: kitGrad('#dc6c54', '#b84632'),
            accent: '#6566d0', ink: '#ffffff', link: '#a9aaff', err: '#ff9a85', ok: '#8fd6a0'
        },
        light: {
            text: '#24243a', muted: '#77766a', line: 'rgba(60,60,40,.12)', edge: 'rgba(60,60,40,.2)',
            win: kitBg('#fdfcf5', '#f5f2e4'), card: kitBg('#fffffe', '#fbfaf2'), field: '#fdfdfa',
            soft: '#e9e6d2', softx: '#24243a', sunk: 'rgba(60,60,40,.04)', pill: '#ffffff', shadow: 'rgba(60,60,30,.18)',
            teal: kitGrad('#6668cc', '#3a3ba4'), green: kitGrad('#8a8d98', '#6a6d78'),
            yellow: kitGrad('#efd078', '#dcb04a'), red: kitGrad('#d8694f', '#bf4b33'),
            accent: '#5254c4', ink: '#ffffff', link: '#3e40b0', err: '#b3261e', ok: '#2e7d4f', scheme: 'light'
        }
    },
    wattpad: {
        dark: {
            text: '#f4ece7', muted: '#ae9f97', line: 'rgba(255,220,200,.09)', edge: 'rgba(255,220,200,.17)',
            win: kitBg('#2b2423', '#1f1918'), card: kitBg('#3a3231', '#322b2a'), field: '#0f0c0b',
            soft: '#463a36', softx: '#f4ece7', pill: '#241e1d', shadow: 'rgba(0,0,0,.55)',
            teal: kitGrad('#fa8c45', '#e4621e'), green: kitGrad('#2f95a6', '#1c6f7f'),
            yellow: kitGrad('#f6cf6c', '#e8ac3c'), red: kitGrad('#ee6e60', '#d6433a'),
            accent: '#f07a33', ink: '#ffffff', link: '#ffb37e', err: '#ff9a85', ok: '#8fd6a0'
        },
        light: {
            text: '#3b2516', muted: '#8e7462', line: 'rgba(140,90,30,.13)', edge: 'rgba(140,90,30,.23)',
            win: kitBg('#fffcf4', '#fbf2df'), card: kitBg('#fffffe', '#fffaf0'), field: '#fffdfa',
            soft: '#fae2b6', softx: '#6b3a10', sunk: 'rgba(140,90,30,.05)', pill: '#ffffff', shadow: 'rgba(120,80,30,.2)',
            teal: kitGrad('#fd9a30', '#f2720a'), green: kitGrad('#2f95a6', '#1c6f7f'),
            yellow: kitGrad('#fbd060', '#f2b33a'), red: kitGrad('#ea5148', '#d63a33'),
            accent: '#f6801a', ink: '#ffffff', link: '#b4560a', err: '#b3261e', ok: '#2e7d4f', scheme: 'light'
        }
    },
    jjwxc: {
        dark: {
            text: '#e9f3ec', muted: '#98b0a1', line: 'rgba(170,230,195,.16)', edge: 'rgba(170,230,195,.3)',
            win: kitBg('#1d3027', '#14231c'), card: kitBg('#27402f', '#20362a'), field: '#09140f',
            soft: '#2f4a39', softx: '#e9f3ec', pill: '#182a21', shadow: 'rgba(0,0,0,.5)',
            teal: kitGrad('#4ed486', '#25a05a'), green: kitGrad('#8fb7a0', '#678f78'),
            yellow: kitGrad('#efd86e', '#d9b936'), red: kitGrad('#ee7f72', '#d4524a'),
            accent: '#3cc474', ink: '#052b14', link: '#8fe6b4', err: '#ff9a8c', ok: '#8fe6b4'
        },
        light: {
            text: '#17301f', muted: '#5c7a66', line: 'rgba(20,90,50,.14)', edge: 'rgba(20,90,50,.23)',
            win: kitBg('#f6fbf7', '#eaf4ed'), card: kitBg('#ffffff', '#f2f8f4'), field: '#ffffff',
            soft: '#dcebe1', softx: '#17301f', sunk: 'rgba(20,90,50,.05)', pill: '#ffffff', shadow: 'rgba(30,70,45,.2)',
            teal: kitGrad('#3fcb7a', '#1c9a55'), green: kitGrad('#9db3a5', '#74907f'),
            yellow: kitGrad('#f6d454', '#e9b52c'), red: kitGrad('#f79085', '#ec6a5f'),
            accent: '#1c9a55', ink: '#ffffff', link: '#117a43', err: '#c0392b', ok: '#12805c', scheme: 'light'
        }
    }
};
function kitSite() {
    var h = String(location.hostname || '').toLowerCase();
    if (/(^|\.)lofter\.com$/.test(h)) return 'lofter';
    if (/sangtacviet|^14\.225\.254\.182$/.test(h)) return 'stv';
    if (/wikicv|wikidich|dichtienghoa|koanchay|truyenwikidich/.test(h)) return 'wikicv';
    if (/archiveofourown|(^|\.)ao3\.org$/.test(h)) return 'ao3';
    if (/fanfiction\.net|fictionpress\.com/.test(h)) return 'ffn';
    if (/wattpad/.test(h)) return 'wattpad';
    if (/(^|\.)jjwxc\.net$/.test(h)) return 'jjwxc';
    return 'lofter';
}
// Tương phản WCAG: chữ trên nút màu phải đạt 4,5 : 1 ở đầu gradient xấu hơn. Chọn chữ trắng hoặc
// chữ tối, rồi nếu còn thiếu thì nhích nền về phía đối lập (đổi nền ít nhất có thể).
function kitRgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h.replace(/./g, '$&$&');
    return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)];
}
function kitHex(c) {
    return '#' + c.map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); }).join('');
}
function kitLum(c) {
    var f = function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
}
function kitRatio(a, b) {
    var x = kitLum(a), y = kitLum(b);
    if (x < y) { var t = x; x = y; y = t; }
    return (x + 0.05) / (y + 0.05);
}
function kitMix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
// grad = 'linear-gradient(135deg,#a 0%,#b 100%)' → { grad, on }
function kitFitGrad(grad, darkText) {
    var m = String(grad).match(/#[0-9a-f]{3,6}/gi);
    if (!m || m.length < 2) return { grad: grad, on: '#ffffff' };
    var c = [kitRgb(m[0]), kitRgb(m[1])], best = null;
    [[[255, 255, 255], [0, 0, 0]], [darkText, [255, 255, 255]]].forEach(function (opt) {
        var tx = opt[0], to = opt[1], cost = 0, p = c;
        var worst = function (q) { return Math.min(kitRatio(tx, q[0]), kitRatio(tx, q[1])); };
        while (worst(p) < 4.5 && cost < 0.75) {
            cost += 0.03;
            p = [kitMix(c[0], to, cost), kitMix(c[1], to, cost)];
        }
        if (!best || cost < best.cost - 1e-9) best = { cost: cost, tx: tx, p: p };
    });
    return { grad: kitGrad(kitHex(best.p[0]), kitHex(best.p[1])), on: kitHex(best.tx) };
}
// Bộ màu đầy đủ (mọi khóa của KIT_DARK) cho một trang và một theme.
function kitPalette(site, light) {
    var s = KIT_SITES[site] || KIT_SITES.lofter, out = {}, k;
    for (k in KIT_DARK) out[k] = KIT_DARK[k];
    if (light) for (k in KIT_SITES.lofter.light) out[k] = KIT_SITES.lofter.light[k];
    var own = light ? s.light : s.dark;
    for (k in own) out[k] = own[k];
    var dark = kitHex(kitMix(kitRgb(out.accent), [0, 0, 0], 0.7)), f;
    f = kitFitGrad(out.teal, kitRgb(dark)); out.teal = f.grad; out.on = f.on; out.ink = f.on;
    f = kitFitGrad(out.green, kitRgb(dark)); out.green = f.grad; out.ong = f.on;
    f = kitFitGrad(out.yellow, kitRgb(dark)); out.yellow = f.grad; out.ony = f.on;
    f = kitFitGrad(out.red, kitRgb(dark)); out.red = f.grad; out.onr = f.on;
    return out;
}
var KIT_TOKENS = ':host{all:initial;' + Object.keys(KIT_DARK).map(function (k) {
    return '--k-' + k + ':var(--kt-' + k + ',' + KIT_DARK[k] + ');';
}).join('') + 'color-scheme:var(--k-scheme);}' +
    '*{box-sizing:border-box;}';
var KIT_FONT = 'font-family:"Be Vietnam Pro","Segoe UI",system-ui,-apple-system,Roboto,"Noto Sans","Microsoft YaHei","Noto Sans CJK SC",Arial,sans-serif;';
var KIT_CSS = KIT_TOKENS +
    '.kit{' + KIT_FONT + 'font-size:12px;line-height:1.45;color:var(--k-text);padding:10px;}' +
    '.card{border:1px solid var(--k-line);border-radius:10px;background:var(--k-card);padding:10px;margin:0 0 9px;min-width:0;' +
    'box-shadow:inset 0 1px 0 rgba(255,255,255,.04);}' +
    '.card:last-child{margin-bottom:0;}' +
    '.card>h4{margin:0 0 9px;font-size:12.5px;font-weight:800;color:var(--k-text);}' +
    '.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:0 0 8px;}.row:last-child{margin-bottom:0;}' +
    '.grow{flex:1;min-width:0;}' +
    // Lưới hai cột chia đều (nút đôi, ô đánh dấu) · dòng "nhãn ……… ô nhập" · phần tử giãn hết chiều ngang.
    '.g2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;margin:0 0 8px;align-items:center;}.g2:last-child{margin-bottom:0;}' +
    '.g2>.btn{width:100%;padding-left:6px;padding-right:6px;overflow:hidden;text-overflow:ellipsis;}.g2>label.ck{min-width:0;}' +
    '.kv{display:flex;align-items:center;gap:8px;margin:0 0 8px;}.kv:last-child{margin-bottom:0;}.kv>span{flex:1;min-width:0;font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
    '.full{width:100%;}' +
    '.btn{' + KIT_FONT + 'appearance:none;border:0;border-radius:7px;padding:8px 12px;font-size:12px;font-weight:700;cursor:pointer;' +
    'background:var(--k-soft);color:var(--k-softx);white-space:nowrap;line-height:1.25;min-height:28px;}' +
    '.btn:hover{filter:brightness(1.08);}.btn:active{transform:translateY(1px);}' +
    '.btn[disabled]{opacity:.45;cursor:not-allowed;filter:none;}' +
    '.btn.pri,.btn.sec,.btn.warn,.btn.dan{color:var(--k-on);text-shadow:none;' +
    'box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 2px 6px rgba(0,0,0,.12);}' +
    '.btn.pri{background:var(--k-teal);}.btn.sec{background:var(--k-green);color:var(--k-ong);}' +
    '.btn.warn{background:var(--k-yellow);color:var(--k-ony);}.btn.dan{background:var(--k-red);color:var(--k-onr);}' +
    '.btn.sm{padding:4px 9px;font-size:11.5px;min-height:24px;}' +
    'input[type=text],input[type=number],input[type=url],select,textarea{' + KIT_FONT + 'background:var(--k-field);color:var(--k-text);' +
    'border:1px solid var(--k-line);border-radius:7px;padding:5px 9px;font-size:12px;min-width:0;min-height:28px;}' +
    'input[type=text]:focus,input[type=number]:focus,input[type=url]:focus,select:focus,textarea:focus{outline:none;border-color:var(--k-accent);}' +
    'textarea{width:100%;resize:vertical;line-height:1.5;}select{max-width:100%;}' +
    'input::placeholder,textarea::placeholder{color:var(--k-muted);opacity:.75;}' +
    'input[type=checkbox],input[type=radio]{accent-color:var(--k-accent);width:16px;height:16px;margin:0;flex:none;}' +
    'input[type=range]{accent-color:var(--k-accent);}' +
    'label.ck{display:inline-flex;align-items:center;gap:7px;font-size:12px;cursor:pointer;min-height:24px;user-select:none;color:var(--k-text);}' +
    // Công tắc: <label class="sw"><input type="checkbox"><i></i></label>
    'label.sw{position:relative;display:inline-block;width:36px;height:24px;flex:none;cursor:pointer;}' +
    'label.sw input{position:absolute;opacity:0;width:0;height:0;}' +
    'label.sw i{position:absolute;inset:0;border-radius:99px;background:var(--k-soft);transition:background .15s;}' +
    'label.sw i::after{content:"";position:absolute;left:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#fff;' +
    'box-shadow:0 1px 2px rgba(0,0,0,.3);transition:transform .15s;}' +
    'label.sw input:checked+i{background:var(--k-teal);}label.sw input:checked+i::after{transform:translateX(12px);}' +
    'label.sw input:focus-visible+i,input:focus-visible,select:focus-visible,textarea:focus-visible,.btn:focus-visible{outline:2px solid var(--k-accent);outline-offset:2px;}' +
    '.lb{display:block;font-size:11px;color:var(--k-muted);margin:0 0 4px;}' +
    '.hint{font-size:11px;color:var(--k-muted);line-height:1.5;}' +
    '.err{color:var(--k-err);}.ok{color:var(--k-ok);}' +
    'details.adv{border:1px solid var(--k-line);border-radius:8px;padding:8px 10px;background:var(--k-field);margin:0 0 8px;}' +
    'details.adv:last-child{margin-bottom:0;}' +
    'details.adv>summary{cursor:pointer;font-weight:700;font-size:12px;user-select:none;}' +
    'details.adv[open]>summary{margin-bottom:8px;}' +
    '.console{' + KIT_FONT + 'background:var(--k-field);border:1px solid var(--k-line);border-radius:8px;padding:8px 10px;height:130px;overflow:auto;' +
    'font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-word;color:var(--k-text);}' +
    '.bar{height:5px;border-radius:9px;background:var(--k-soft);overflow:hidden;}' +
    '.bar>i{display:block;height:100%;width:0;background:var(--k-teal);border-radius:9px;transition:width .2s;}' +
    'a{color:var(--k-link);}' +
    '::-webkit-scrollbar{width:8px;height:8px;}::-webkit-scrollbar-thumb{background:var(--k-edge);border-radius:9px;}';

// Biểu tượng của từng tab / nút tròn. Chuỗi = path SVG 24×24 (nét); { text } = một chữ cái.
var KIT_ICONS = {
    tts: 'M4.5 13v4.5A1.5 1.5 0 006 19h1.2A1.8 1.8 0 009 17.2v-3.4A1.8 1.8 0 007.2 12H6a1.5 1.5 0 00-1.5 1zM19.5 13v4.5A1.5 1.5 0 0118 19h-1.2a1.8 1.8 0 01-1.8-1.8v-3.4a1.8 1.8 0 011.8-1.8H18a1.5 1.5 0 011.5 1zM4.5 13A7.5 7.5 0 0112 5.5 7.5 7.5 0 0119.5 13',
    ndl: 'M12 4v10m0 0l-4-4m4 4l4-4M5 19h14',
    tm: { text: 'D' },
    lib: 'M12 6.5C10.3 5.3 7.8 4.8 4 5v13c3.8-.2 6.3.3 8 1.5 1.7-1.2 4.2-1.7 8-1.5V5c-3.8-.2-6.3.3-8 1.5zM12 6.5v13',
    desk: 'M10.5 4.5a6 6 0 104.24 10.24L19.5 19.5M10.5 4.5a6 6 0 014.24 10.24'
};
function kitIcon(name) {
    var NS = 'http://www.w3.org/2000/svg';
    var def = KIT_ICONS[name] || KIT_ICONS.tm;
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '18'); svg.setAttribute('height', '18');
    if (typeof def === 'object') {
        var t = document.createElementNS(NS, 'text');
        t.setAttribute('x', '12'); t.setAttribute('y', '17.5'); t.setAttribute('text-anchor', 'middle');
        t.setAttribute('font-size', '16'); t.setAttribute('font-weight', '700'); t.setAttribute('fill', 'currentColor');
        t.setAttribute('font-family', '"Be Vietnam Pro","Segoe UI",Arial,sans-serif');
        t.textContent = def.text;
        svg.appendChild(t);
        return svg;
    }
    var p = document.createElementNS(NS, 'path');
    svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2'); svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('d', def);
    svg.appendChild(p);
    return svg;
}

/* ---- Theme ------------------------------------------------------------------- */
var KIT_THEME_KEY = 'aurel-ui-theme';
var KIT_THEMES = {
    dark: { next: 'light', glyph: '☾', name: 'tối' },
    light: { next: 'auto', glyph: '☀', name: 'sáng' },
    auto: { next: 'dark', glyph: '◐', name: 'theo hệ thống' }
};
function kitThemeGet() {
    try { var v = localStorage.getItem(KIT_THEME_KEY); return KIT_THEMES[v] ? v : 'dark'; } catch (e) { return 'dark'; }
}
// Đặt bộ màu của trang này (tối hoặc sáng) lên các khung gốc đang có, và cập nhật nút theme.
function kitThemeApply() {
    var mode = kitThemeGet(), light = mode === 'light', site = kitSite();
    try { if (mode === 'auto') light = window.matchMedia('(prefers-color-scheme: light)').matches; } catch (e) {}
    var pal = kitPalette(site, light);
    // Khung gốc của bảng chung + mọi khung riêng của script khác xin nhận màu bằng data-aurel-skin.
    var els = ['aurel-hub', 'aurel-hub-2', 'aurel-hub-3', 'aurel-dock'].map(function (id) { return document.getElementById(id); });
    try { els = els.concat(Array.prototype.slice.call(document.querySelectorAll('[data-aurel-skin]'))); } catch (e) {}
    els.forEach(function (el) {
        var k;
        if (!el) return;
        for (k in pal) el.style.setProperty('--kt-' + k, pal[k]);
        el.setAttribute('data-theme', light ? 'light' : 'dark');
        el.setAttribute('data-site', site);
        var items = el.shadowRoot ? el.shadowRoot.querySelectorAll('.menu button[data-mode]') : [];
        Array.prototype.forEach.call(items, function (b) { b.firstChild.textContent = b.getAttribute('data-mode') === mode ? '✓' : ''; });
    });
}
function kitThemeSet(mode) {
    try { localStorage.setItem(KIT_THEME_KEY, mode); } catch (e) {}
    kitThemeApply();
}

/* ---- Cột nút nhanh ---------------------------------------------------------- */
function dockEl() {
    var d = document.getElementById('aurel-dock');
    if (d) return d;
    d = document.createElement('div');
    d.id = 'aurel-dock';
    d.style.cssText = 'all:initial;position:fixed;right:14px;bottom:14px;z-index:2147483646;display:flex;' +
        'flex-direction:row;align-items:flex-end;gap:10px;pointer-events:none;';
    var side = document.createElement('div'), col = document.createElement('div');
    side.className = 'side';
    side.style.cssText = 'all:initial;display:flex;flex-direction:column;align-items:flex-end;gap:8px;pointer-events:auto;';
    col.className = 'col';
    col.style.cssText = 'all:initial;display:flex;flex-direction:column-reverse;align-items:flex-end;gap:8px;pointer-events:none;';
    d.appendChild(side); d.appendChild(col);
    document.documentElement.appendChild(d);
    kitThemeApply();
    return d;
}
function dockSlot(id, order) {
    var col = dockEl().querySelector('.col');
    var slot = col.querySelector('[data-slot="' + id + '"]');
    if (!slot) {
        slot = document.createElement('div');
        slot.setAttribute('data-slot', id);
        slot.style.cssText = 'all:initial;order:' + order + ';display:flex;flex-direction:column-reverse;' +
            'align-items:flex-end;gap:8px;pointer-events:auto;';
        col.appendChild(slot);
    }
    return slot;
}
// Chỗ bên trái cột nút — cho mini-player, để nó nằm cạnh các nút tròn thay vì chồng lên trên.
function dockSide() { return dockEl().querySelector('.side'); }
var DOCK_CSS = KIT_TOKENS +
    // Khi thu: chỉ còn vòng tròn. Rê chuột: chữ mở ra bên trái, vòng tròn đứng yên.
    '.pill{' + KIT_FONT + 'display:flex;flex-direction:row-reverse;align-items:center;height:42px;padding:3px;border-radius:999px;cursor:pointer;' +
    'background:transparent;border:1px solid transparent;color:var(--k-text);user-select:none;' +
    'transition:background .18s ease,border-color .18s ease,box-shadow .18s ease;}' +
    '.pill:hover,.pill.open{background:var(--k-pill);border-color:var(--k-edge);box-shadow:0 6px 18px var(--k-shadow);}' +
    '.pill .ic{all:unset;flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;cursor:pointer;' +
    'background:var(--k-teal);color:var(--k-on);font-weight:800;font-size:14px;' +
    '.pill .ic:focus-visible{outline:2px solid var(--k-accent);outline-offset:2px;}' +
    'box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 4px 12px var(--k-shadow);}' +
    '.pill .ic:hover{filter:brightness(1.1);}' +
    '.pill .tx{all:unset;cursor:pointer;font-size:12.5px;font-weight:700;white-space:nowrap;overflow:hidden;max-width:0;opacity:0;' +
    'transition:max-width .18s ease,opacity .18s ease,padding .18s ease;padding:0;}' +
    '.pill:hover .tx,.pill.open .tx{max-width:190px;opacity:1;padding:0 9px 0 12px;}' +
    '.pill.busy .ic{animation:kpulse 1s ease-in-out infinite;}' +
    '.pill.on .ic{outline:2px solid var(--k-accent);outline-offset:2px;}' +
    '@keyframes kpulse{50%{filter:brightness(1.3);}}';
// Một nút trên cột: vòng tròn = làm ngay (onIcon), chữ = mở tab (onLabel). Chữ ẩn cho tới
// khi rê chuột vào. Trả về { host, pill, ic, tx } để script tự đổi nhãn / trạng thái.
function dockPill(slot, icon, label, onIcon, onLabel) {
    var host = document.createElement('div');
    host.style.cssText = 'all:initial;display:block;';
    var r = host.attachShadow({ mode: 'open' });
    var st = document.createElement('style');
    st.textContent = DOCK_CSS;
    var pill = document.createElement('div'), ic = document.createElement('button'), tx = document.createElement('button');
    pill.className = 'pill'; ic.className = 'ic'; tx.className = 'tx';
    if (typeof icon === 'string' && KIT_ICONS[icon]) ic.appendChild(kitIcon(icon)); else ic.textContent = icon;
    tx.textContent = label;
    ic.addEventListener('click', function (e) { e.stopPropagation(); (onIcon || onLabel)(e); });
    tx.addEventListener('click', function (e) { e.stopPropagation(); (onLabel || onIcon)(e); });
    pill.appendChild(ic); pill.appendChild(tx);
    r.appendChild(st); r.appendChild(pill);
    slot.appendChild(host);
    return { host: host, pill: pill, ic: ic, tx: tx };
}

/* ---- Bảng chung ------------------------------------------------------------- */
var HUB_CSS = KIT_TOKENS +
    '.win{' + KIT_FONT + 'width:300px;max-width:calc(100vw - 20px);max-height:min(90vh,860px);display:flex;flex-direction:column;' +
    'background:var(--k-win);color:var(--k-text);border:1px solid var(--k-edge);border-radius:12px;' +
    'box-shadow:0 20px 55px var(--k-shadow);overflow:hidden;font-size:12px;line-height:1.45;}' +
    '.bar{display:flex;align-items:flex-end;gap:8px;margin:0 10px;padding:9px 0 9px;border-bottom:1px solid var(--k-line);}' +
    '.tabs{display:flex;gap:6px;flex:1;min-width:0;}' +
    '.tab{all:unset;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;height:30px;min-width:30px;padding:0;' +
    'border-radius:7px;box-sizing:border-box;border:1px solid var(--k-edge);background:var(--k-sunk);color:var(--k-text);opacity:.8;' +
    'font-size:12px;font-weight:800;white-space:nowrap;}' +
    '.tab svg{width:16px;height:16px;flex:none;}' +
    '.tab .tl{display:none;}.tab:hover{opacity:1;background:var(--k-soft);}' +
    '.tab.on{background:var(--k-teal);color:var(--k-ink);border-color:transparent;opacity:1;padding:0 13px 0 10px;' +
    'box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 3px 10px rgba(0,0,0,.15);}.tab.on .tl{display:inline;}' +
    '.side{display:flex;flex-direction:column;align-items:flex-end;gap:4px;}' +
    '.ver{font-size:11px;color:var(--k-muted);line-height:1;min-height:9px;}' +
    '.wb{display:flex;gap:4px;}' +
    '.wb button{all:unset;cursor:pointer;box-sizing:border-box;width:24px;height:24px;display:grid;place-items:center;border:1px solid var(--k-edge);' +
    'border-radius:6px;font-size:13px;font-weight:800;line-height:1;color:var(--k-text);background:var(--k-sunk);}' +
    '.wb button:hover{background:var(--k-soft);}.wb button:focus-visible{outline:2px solid var(--k-accent);outline-offset:1px;}' +
    '.menu{position:absolute;right:10px;top:46px;z-index:5;min-width:190px;padding:5px;border:1px solid var(--k-edge);border-radius:9px;' +
    'background:var(--k-card);box-shadow:0 10px 28px var(--k-shadow);display:none;}.menu.open{display:block;}' +
    '.menu .mh{font-size:11px;color:var(--k-muted);padding:4px 8px 2px;}' +
    '.menu button{all:unset;cursor:pointer;display:flex;align-items:center;gap:8px;box-sizing:border-box;width:100%;min-height:28px;padding:0 8px;' +
    'border-radius:6px;font-size:12px;color:var(--k-text);}.menu button:hover,.menu button:focus-visible{background:var(--k-soft);}' +
    '.menu button .tick{width:14px;color:var(--k-accent);font-weight:800;}' +
    '.win{position:relative;}' +
    '.sheet{position:absolute;inset:0;z-index:6;display:none;flex-direction:column;background:var(--k-win);}.sheet.open{display:flex;}' +
    '.sheet .sh{display:flex;align-items:center;gap:8px;padding:9px 10px;border-bottom:1px solid var(--k-line);font-weight:800;}' +
    '.sheet .sh span{flex:1;}.sheet .sh button{all:unset;cursor:pointer;width:24px;height:24px;display:grid;place-items:center;border:1px solid var(--k-edge);border-radius:6px;background:var(--k-sunk);}' +
    '.sheet .sb{flex:1;min-height:0;overflow:auto;padding:10px;font-size:12px;line-height:1.5;white-space:pre-wrap;word-break:break-word;}' +
    '.sheet .sb.mono{font-size:11px;}' +
    '.bar{cursor:grab;touch-action:none;}.bar.drag{cursor:grabbing;}.bar button,.bar .tab{cursor:pointer;}' +
    '.grip{position:absolute;left:50%;top:3px;width:28px;height:3px;margin-left:-14px;border-radius:3px;background:var(--k-edge);pointer-events:none;}' +
    '.panes{flex:1;min-height:0;overflow:auto;}' +
    '::-webkit-scrollbar{width:8px;}::-webkit-scrollbar-thumb{background:var(--k-edge);border-radius:9px;}';
// Vị trí bảng: kéo ở thanh tab, nhớ trong localStorage của trang (khóa chung cho cả ba sandbox);
// bấm đúp thanh tab để về góc phải dưới. Phím tắt Alt+Shift+A mở / đóng bảng.
var KIT_POS_KEY = 'aurel-ui-pos';
function kitPosSave(p) {
    try { if (p) localStorage.setItem(KIT_POS_KEY, JSON.stringify(p)); else localStorage.removeItem(KIT_POS_KEY); } catch (e) {}
}
function kitPosApply(h) {
    var p = null, x, y;
    try { p = JSON.parse(localStorage.getItem(KIT_POS_KEY) || 'null'); } catch (e) {}
    if (!p || typeof p.x !== 'number' || typeof p.y !== 'number') {
        h.style.left = ''; h.style.top = ''; h.style.right = '14px'; h.style.bottom = '14px';
        return;
    }
    x = Math.max(0, Math.min(p.x, window.innerWidth - 60));
    y = Math.max(0, Math.min(p.y, window.innerHeight - 40));
    h.style.right = 'auto'; h.style.bottom = 'auto'; h.style.left = x + 'px'; h.style.top = y + 'px';
}
// Nhật ký chung: script nào cũng ghi được bằng kitLog('...'); sandbox dựng bảng nghe 'aurel-hub:log'.
function kitLog(text) {
    try { document.dispatchEvent(new CustomEvent('aurel-hub:log', { detail: String(text) })); } catch (e) {}
}
var KIT_KEYS = [KIT_THEME_KEY, KIT_POS_KEY];
function kitExport() {
    var o = {}, k;
    try { for (k = 0; k < KIT_KEYS.length; k++) { var v = localStorage.getItem(KIT_KEYS[k]); if (v != null) o[KIT_KEYS[k]] = v; } } catch (e) {}
    return JSON.stringify(o);
}
function kitImport(text) {
    var o = JSON.parse(text), k, n = 0;
    for (k = 0; k < KIT_KEYS.length; k++) if (typeof o[KIT_KEYS[k]] === 'string') { localStorage.setItem(KIT_KEYS[k], o[KIT_KEYS[k]]); n++; }
    return n;
}
function kitReset() {
    try { KIT_KEYS.forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {}
}
var KIT_GUIDE = 'Script không chạy? Không thấy nút ở góc phải dưới?\n\n' +
    '1. Chrome / Edge 138 trở lên: vào chrome://extensions (edge://extensions), mở chi tiết Tampermonkey và bật "Allow User Scripts". ' +
    'Bản cũ hơn: bật Developer mode ở trang đó.\n' +
    '2. Trên biểu tượng Tampermonkey, kiểm tra script của trang này đang bật.\n' +
    '3. Tải lại trang (Ctrl + R).\n\n' +
    'Phím tắt mở / đóng bảng: Alt + Shift + A.';
function hubToggle() {
    var h = hubEl(), first = h.shadowRoot.querySelector('.tab');
    if (hubActive()) hubHide();
    else hubShow(h.getAttribute('data-last') || (first && first.getAttribute('data-tab')) || '');
}
function hubEl() {
    // Bảng do script khác tạo: shadow root mở thì sandbox nào cũng với tới được. Nếu trình
    // quản lý userscript không cho (shadowRoot = null) thì lùi sang một bảng riêng.
    var ids = ['aurel-hub', 'aurel-hub-2', 'aurel-hub-3'], h, i;
    for (i = 0; i < ids.length; i++) {
        h = document.getElementById(ids[i]);
        if (h && h.shadowRoot) return h;
        if (!h) break;
    }
    h = document.createElement('div');
    h.id = ids[Math.min(i, ids.length - 1)];
    h.className = 'ttsr-ui';   // TTS Reader coi mọi thứ mang class này là giao diện, không phải chữ của trang
    h.style.cssText = 'all:initial;position:fixed;right:14px;bottom:14px;z-index:2147483647;display:none;';
    var r = h.attachShadow({ mode: 'open' });
    var mk = function (tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
    var st = mk('style'), win = mk('div', 'win'), bar = mk('div', 'bar'), tabs = mk('div', 'tabs'),
        side = mk('div', 'side'), ver = mk('div', 'ver'), wb = mk('div', 'wb'), panes = mk('div', 'panes');
    st.textContent = HUB_CSS;
    var bMore = mk('button', 'th', '⋯'), bMin = mk('button', '', '–'), bClose = mk('button', '', '✕'), menu = mk('div', 'menu');
    bMore.title = 'Giao diện · hướng dẫn';
    bMore.setAttribute('aria-haspopup', 'menu');
    bMin.title = 'Thu bảng lại (các nút nhanh vẫn ở góc màn hình)';
    bClose.title = 'Đóng';
    var say = function (type) { document.dispatchEvent(new CustomEvent(type, { detail: h.getAttribute('data-active') || '' })); };
    // Menu ⋯: giao diện (theo hệ thống · sáng · tối) và hướng dẫn của tab đang mở.
    var menuItem = function (label, mode, fn) {
        var b = mk('button'), t = mk('span', 'tick');
        b.setAttribute('role', 'menuitem');
        if (mode) b.setAttribute('data-mode', mode);
        b.appendChild(t); b.appendChild(document.createTextNode(label));
        b.addEventListener('click', function () { menu.classList.remove('open'); fn(); });
        menu.appendChild(b);
    };
    menu.appendChild(mk('div', 'mh', 'Giao diện'));
    menuItem('Theo hệ thống', 'auto', function () { kitThemeSet('auto'); });
    menuItem('Sáng', 'light', function () { kitThemeSet('light'); });
    menuItem('Tối', 'dark', function () { kitThemeSet('dark'); });
    menu.appendChild(mk('div', 'mh', 'Trợ giúp'));
    menuItem('Hướng dẫn của tab này', '', function () { say('aurel-hub:help'); });
    menuItem('Đặt lại vị trí bảng', '', function () { kitPosSave(null); kitPosApply(h); });
    var logs = [];
    document.addEventListener('aurel-hub:log', function (e) {
        var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
        logs.push(p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()) + '  ' + e.detail);
        if (logs.length > 200) logs.shift();
    });
    var sheet = mk('div', 'sheet'), sh = mk('div', 'sh'), shT = mk('span'), shX = mk('button', '', '✕'), sb = mk('div', 'sb');
    shX.title = 'Đóng';
    shX.addEventListener('click', function () { sheet.classList.remove('open'); });
    sh.appendChild(shT); sh.appendChild(shX); sheet.appendChild(sh); sheet.appendChild(sb);
    var openSheet = function (title, text, mono) { shT.textContent = title; sb.textContent = text; sb.className = mono ? 'sb mono' : 'sb'; sheet.classList.add('open'); };
    menu.appendChild(mk('div', 'mh', 'Cài đặt giao diện'));
    menuItem('Xuất (chép vào clipboard)', '', function () {
        var t = kitExport();
        try { navigator.clipboard.writeText(t).then(function () { kitLog('Đã chép cài đặt giao diện vào clipboard'); }, function () { window.prompt('Chép đoạn này:', t); }); }
        catch (e) { window.prompt('Chép đoạn này:', t); }
    });
    menuItem('Nhập…', '', function () {
        var t = window.prompt('Dán cài đặt giao diện đã xuất:');
        if (!t) return;
        try { kitLog('Đã nhập ' + kitImport(t) + ' mục cài đặt giao diện'); kitThemeApply(); kitPosApply(h); }
        catch (e) { kitLog('Nhập lỗi: ' + e.message); openSheet('Nhập lỗi', String(e.message)); }
    });
    menuItem('Đặt lại giao diện + vị trí', '', function () { kitReset(); kitThemeApply(); kitPosApply(h); kitLog('Đã đặt lại giao diện và vị trí'); });
    menu.appendChild(mk('div', 'mh', 'Cài đặt riêng từng script nằm trong Tampermonkey, không thuộc phần này.'));
    menuItem('Nhật ký', '', function () { openSheet('Nhật ký', logs.length ? logs.join('\n') : '(chưa có dòng nào)', true); });
    menuItem('Script không chạy?', '', function () { openSheet('Script không chạy?', KIT_GUIDE); });
    win.appendChild(sheet);
    menu.appendChild(mk('div', 'mh', 'Phím tắt mở / đóng: Alt + Shift + A'));
    bMore.addEventListener('click', function (e) { e.stopPropagation(); menu.classList.toggle('open'); });
    win.addEventListener('click', function () { menu.classList.remove('open'); });
    win.addEventListener('keydown', function (e) { if (e.key === 'Escape') menu.classList.remove('open'); });
    bMin.addEventListener('click', hubHide);
    bClose.addEventListener('click', function () { say('aurel-hub:close'); hubHide(); });
    wb.appendChild(bMore); wb.appendChild(bMin); wb.appendChild(bClose);
    var grip = mk('div', 'grip');
    win.appendChild(grip);
    bar.addEventListener('pointerdown', function (e) {
        if (e.button !== 0 || e.target.closest && e.target.closest('button')) return;
        var box = h.getBoundingClientRect(), dx = e.clientX - box.left, dy = e.clientY - box.top;
        bar.classList.add('drag');
        try { bar.setPointerCapture(e.pointerId); } catch (x) {}
        var move = function (ev) {
            h.style.right = 'auto'; h.style.bottom = 'auto';
            h.style.left = Math.max(0, Math.min(ev.clientX - dx, window.innerWidth - 60)) + 'px';
            h.style.top = Math.max(0, Math.min(ev.clientY - dy, window.innerHeight - 40)) + 'px';
        };
        var up = function () {
            bar.classList.remove('drag');
            bar.removeEventListener('pointermove', move); bar.removeEventListener('pointerup', up); bar.removeEventListener('pointercancel', up);
            var b2 = h.getBoundingClientRect();
            kitPosSave({ x: Math.round(b2.left), y: Math.round(b2.top) });
        };
        bar.addEventListener('pointermove', move); bar.addEventListener('pointerup', up); bar.addEventListener('pointercancel', up);
    });
    bar.addEventListener('dblclick', function (e) {
        if (e.target.closest && e.target.closest('button')) return;
        kitPosSave(null); kitPosApply(h);
    });
    document.addEventListener('keydown', function (e) {
        if (e.altKey && e.shiftKey && !e.ctrlKey && !e.metaKey && (e.key === 'A' || e.key === 'a')) { e.preventDefault(); hubToggle(); }
    });
    window.addEventListener('resize', function () { if (h.style.display !== 'none') kitPosApply(h); });
    side.appendChild(ver); side.appendChild(wb);
    bar.appendChild(tabs); bar.appendChild(side);
    win.appendChild(bar); win.appendChild(panes); win.appendChild(menu);
    r.appendChild(st); r.appendChild(win);
    document.documentElement.appendChild(h);
    kitThemeApply();
    // "Theo hệ thống": hệ điều hành đổi sáng/tối thì đổi theo.
    try { window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', kitThemeApply); } catch (e) {}
    return h;
}
function hubTab(id, label, order, version, icon) {
    var r = hubEl().shadowRoot;
    var pane = r.querySelector('.panes > [data-pane="' + id + '"]');
    if (pane) return pane;
    var tab = document.createElement('button'), tl = document.createElement('span');
    tab.className = 'tab';
    tab.setAttribute('data-tab', id);
    tab.setAttribute('data-ver', version || '');
    tab.title = label;
    tab.style.order = order;
    tl.className = 'tl';
    tl.textContent = label;
    tab.appendChild(kitIcon(icon || id));
    tab.appendChild(tl);
    tab.addEventListener('click', function () { hubShow(id); });
    r.querySelector('.tabs').appendChild(tab);
    pane = document.createElement('div');
    pane.setAttribute('data-pane', id);
    pane.style.display = 'none';
    r.querySelector('.panes').appendChild(pane);
    return pane;
}
function hubActive() {
    var h = document.getElementById('aurel-hub');
    return (h && h.style.display !== 'none' && h.getAttribute('data-active')) || '';
}
function hubShow(id) {
    var h = hubEl(), r = h.shadowRoot, i, ver = '';
    var panes = r.querySelectorAll('.panes > [data-pane]'), tabs = r.querySelectorAll('.tab');
    for (i = 0; i < panes.length; i++) panes[i].style.display = panes[i].getAttribute('data-pane') === id ? 'block' : 'none';
    for (i = 0; i < tabs.length; i++) {
        var on = tabs[i].getAttribute('data-tab') === id;
        tabs[i].className = on ? 'tab on' : 'tab';
        if (on) ver = tabs[i].getAttribute('data-ver') || '';
    }
    r.querySelector('.ver').textContent = ver ? 'v' + ver : '';
    h.style.display = 'block';
    kitPosApply(h);
    h.setAttribute('data-active', id);
    h.setAttribute('data-last', id);
    // Bảng mở ra ở đúng góc đặt cột nút → ẩn cột nút cho khỏi đè lên nhau.
    var d = document.getElementById('aurel-dock');
    if (d) d.style.display = 'none';
    document.dispatchEvent(new CustomEvent('aurel-hub:change', { detail: id }));
}
function hubHide() {
    var h = hubEl();
    h.style.display = 'none';
    h.setAttribute('data-active', '');
    var d = document.getElementById('aurel-dock');
    if (d) d.style.display = 'flex';
    document.dispatchEvent(new CustomEvent('aurel-hub:change', { detail: '' }));
}
// </aurel-ui-kit>

    const APP = 'wdla';
    const VERSION = '0.4.0-aurelysn';
    const VERSION_STORAGE_KEY = `${APP}:version`;
    const DB_NAME = 'wdLibraryArchive';
    const DB_VERSION = 1;
    const STORE_LIBRARIES = 'libraries';
    const STORE_META = 'libraryMeta';
    const PREVIEW_LIMIT = 200;
    const DEFAULT_PAGE_SIZE_ESTIMATE = 15;
    const BOOKMARK_PAGE_SIZE = 10;
    const MAX_EMBED_COVER_CONCURRENCY = 6;
    const EMBED_COVER_START_STAGGER_MS = 90;
    const EMBED_COVER_COOLDOWN_MS = 120;
    const DEFAULT_SETTINGS = {
        timeoutMs: 20000,
        delayMs: 1200,
        retryCount: 3,
        retryDelayMs: 2500,
        htmlEmbedCovers: true,
        maxLogEntries: 160
    };
    const PLACEHOLDER_COVER = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="220" viewBox="0 0 160 220">
            <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#16324a"/>
                    <stop offset="100%" stop-color="#0d1a2b"/>
                </linearGradient>
            </defs>
            <rect width="160" height="220" rx="14" fill="url(#g)"/>
            <rect x="18" y="18" width="124" height="184" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)"/>
            <text x="80" y="102" text-anchor="middle" fill="#d8ebff" font-size="18" font-family="Segoe UI, Arial, sans-serif" font-weight="700">NO</text>
            <text x="80" y="128" text-anchor="middle" fill="#d8ebff" font-size="18" font-family="Segoe UI, Arial, sans-serif" font-weight="700">COVER</text>
        </svg>
    `)}`;
    const numberFormatter = new Intl.NumberFormat('vi-VN');
    const state = {
        currentPageUser: '',
        sourceKind: 'library',
        viewerUser: '',
        viewerDisplayName: '',
        settings: loadSettings(),
        logs: [],
        metaList: [],
        selectedKey: '',
        dataset: null,
        ui: null,
        shadow: null,
        panelOpen: false,
        scanning: false,
        exportBusy: false,
        abortScan: false,
        guideOpen: false,
        guideMode: '',
        previousVersion: '',
        versionChecked: false,
        preview: {
            search: '',
            listId: 'all',
            sortBy: 'views'
        },
        progress: {
            mode: 'idle',
            startedAt: 0,
            total: 0,
            completed: 0,
            attempts: 0,
            attemptDurationMs: 0,
            stage: 'Chưa quét',
            currentLabel: '',
            extra: '',
            delayMs: 0
        }
    };

    function id(name) {
        return `${APP}-${name}`;
    }

    function safeGetValue(key, fallback) {
        try {
            if (typeof GM_getValue === 'function') {
                const value = GM_getValue(key, fallback);
                return value == null ? fallback : value;
            }
        } catch (_) {}
        return fallback;
    }

    function safeSetValue(key, value) {
        try {
            if (typeof GM_setValue === 'function') {
                GM_setValue(key, value);
            }
        } catch (_) {}
    }

    function loadSettings() {
        const saved = safeGetValue(`${APP}:settings`, null);
        return {
            ...DEFAULT_SETTINGS,
            ...(saved && typeof saved === 'object' ? saved : {})
        };
    }

    function persistSettings() {
        safeSetValue(`${APP}:settings`, state.settings);
    }

    function fmtNum(value) {
        return Number.isFinite(value) ? numberFormatter.format(value) : '0';
    }

    function fmtDateTime(value) {
        if (!value) return '—';
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString('vi-VN');
    }

    function fmtDuration(ms) {
        if (!Number.isFinite(ms) || ms <= 0) return '0s';
        const totalSeconds = Math.round(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        if (hours) return `${hours}h ${minutes}p ${seconds}s`;
        if (minutes) return `${minutes}p ${seconds}s`;
        return `${seconds}s`;
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function escapeAttr(value) {
        return escapeHtml(value);
    }

    function stripDiacritics(value) {
        return String(value ?? '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function sleepWithAbort(ms) {
        const end = Date.now() + ms;
        while (Date.now() < end) {
            if (state.abortScan) {
                throw new Error('SCAN_ABORTED');
            }
            await sleep(Math.min(150, end - Date.now()));
        }
    }

    function toAbsoluteUrl(url) {
        if (!url) return '';
        try {
            return new URL(url, location.origin).href;
        } catch (_) {
            return String(url);
        }
    }

    function parseObjectId(value) {
        if (!value) return '';
        if (typeof value === 'string') return value;
        if (typeof value === 'object' && value.$oid) return value.$oid;
        return String(value);
    }

    function normalizeUserSlug(input) {
        let value = String(input ?? '').trim();
        if (!value) return '';
        value = value.replace(/^https?:\/\/[^/]+/i, '');
        value = value.replace(/^\/user\//i, '');
        value = value.replace(/^user\//i, '');
        value = value.replace(/\/.*$/, '');
        try {
            value = decodeURIComponent(value);
        } catch (_) {}
        return value.trim();
    }

    function getSourceKind(pathname = window.location.pathname) {
        return /\/bookmarks(?:\/|$)/i.test(String(pathname || '')) ? 'bookmarks' : 'library';
    }

    function sourceKindLabel(sourceKind) {
        return sourceKind === 'bookmarks' ? 'Bookmarks' : 'Thư viện';
    }

    function buildDatasetKey(host, viewerUser, targetUser, sourceKind = state.sourceKind || 'library') {
        const base = `${host}::${encodeURIComponent(viewerUser || 'anonymous')}::${encodeURIComponent(targetUser)}`;
        return sourceKind === 'library' ? base : `${base}::${sourceKind}`;
    }

    function buildResumeKey(baseKey) {
        return `${baseKey}::resume`;
    }

    function isResumeKey(key) {
        return String(key || '').endsWith('::resume');
    }

    function getBaseKeyFromAnyKey(key) {
        const raw = String(key || '');
        return isResumeKey(raw) ? raw.slice(0, -'::resume'.length) : raw;
    }

    function inferDatasetKind(dataset) {
        if (dataset?.kind === 'resume' || dataset?.status === 'partial') return 'resume';
        if (dataset?.kind === 'complete') return 'complete';
        return isResumeKey(dataset?.key) ? 'resume' : 'complete';
    }

    function inferDatasetStatus(dataset) {
        if (dataset?.status) return dataset.status;
        return inferDatasetKind(dataset) === 'resume' ? 'partial' : 'complete';
    }

    function getDatasetKeysForUser(host, viewerUser, targetUser, sourceKind = state.sourceKind || 'library') {
        const baseKey = buildDatasetKey(host, viewerUser, targetUser, sourceKind);
        return {
            baseKey,
            resumeKey: buildResumeKey(baseKey)
        };
    }

    function bookStatValue(rawStats, key) {
        const value = rawStats && Number(rawStats[key]);
        return Number.isFinite(value) ? value : 0;
    }

    function getCurrentPageUser() {
        const match = window.location.pathname.match(/^\/user\/([^/]+)\/(?:thu-vien|bookmarks)(?:\/|$)/i);
        return match ? normalizeUserSlug(match[1]) : '';
    }

    function getViewerIdentity() {
        const profileLink = document.querySelector('nav #ddUser a[href^="/user/"], #ddUser a[href^="/user/"]');
        if (!profileLink) {
            return { slug: '', displayName: '' };
        }
        return {
            slug: normalizeUserSlug(profileLink.getAttribute('href') || ''),
            displayName: profileLink.textContent.trim()
        };
    }

    function notify(text, isError = false) {
        try {
            if (typeof GM_notification === 'function') {
                GM_notification({
                    title: 'Library & Bookmarks Archiver',
                    text,
                    timeout: 4000
                });
            }
        } catch (_) {}
        addLog(text, isError ? 'error' : 'info');
    }

    function addLog(message, level = 'info') {
        const entry = {
            time: new Date().toISOString(),
            level,
            message: String(message)
        };
        state.logs.unshift(entry);
        state.logs.length = Math.min(state.logs.length, clamp(state.settings.maxLogEntries, 20, 500));
        renderLogs();
    }

    function openDb() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(STORE_LIBRARIES)) {
                    db.createObjectStore(STORE_LIBRARIES, { keyPath: 'key' });
                }
                if (!db.objectStoreNames.contains(STORE_META)) {
                    const metaStore = db.createObjectStore(STORE_META, { keyPath: 'key' });
                    metaStore.createIndex('by_scannedAt', 'scannedAt', { unique: false });
                    metaStore.createIndex('by_targetUser', 'targetUser', { unique: false });
                    metaStore.createIndex('by_viewerUser', 'viewerUser', { unique: false });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function withDb(storeNames, mode, executor) {
        const db = await openDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeNames, mode);
            const stores = Array.isArray(storeNames)
                ? Object.fromEntries(storeNames.map((name) => [name, tx.objectStore(name)]))
                : { [storeNames]: tx.objectStore(storeNames) };
            let result;
            try {
                result = executor(stores, tx);
            } catch (error) {
                reject(error);
                return;
            }
            tx.oncomplete = () => resolve(result);
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error || new Error('IndexedDB transaction aborted'));
        });
    }

    async function getMetaList() {
        const db = await openDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_META, 'readonly');
            const store = tx.objectStore(STORE_META);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    async function getDataset(key) {
        const db = await openDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_LIBRARIES, 'readonly');
            const request = tx.objectStore(STORE_LIBRARIES).get(key);
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    }

    async function saveDataset(dataset) {
        const meta = buildMetaFromDataset(dataset);
        await withDb([STORE_LIBRARIES, STORE_META], 'readwrite', (stores) => {
            stores[STORE_LIBRARIES].put(dataset);
            stores[STORE_META].put(meta);
        });
        return meta;
    }

    async function deleteDataset(key) {
        await withDb([STORE_LIBRARIES, STORE_META], 'readwrite', (stores) => {
            stores[STORE_LIBRARIES].delete(key);
            stores[STORE_META].delete(key);
        });
    }

    function buildMetaFromDataset(dataset) {
        const baseKey = dataset.baseKey || getBaseKeyFromAnyKey(dataset.key);
        const kind = inferDatasetKind(dataset);
        const status = inferDatasetStatus(dataset);
        const updatedAt = dataset.scannedAt || dataset.checkpointSavedAt || dataset.resume?.updatedAt || dataset.createdAt || '';
        const sizeBytes = (() => {
            try {
                return new Blob([JSON.stringify(dataset)]).size;
            } catch (_) {
                return 0;
            }
        })();
        return {
            key: dataset.key,
            baseKey,
            kind,
            status,
            sourceKind: dataset.sourceKind || 'library',
            host: dataset.host,
            viewerUser: dataset.viewerUser,
            viewerDisplayName: dataset.viewerDisplayName || dataset.viewerUser || '',
            targetUser: dataset.targetUser,
            targetDisplayName: dataset.targetDisplayName || dataset.targetUser || '',
            scannedAt: updatedAt,
            listCount: dataset.summary.listCount,
            uniqueBookCount: dataset.summary.uniqueBookCount,
            totalRefs: dataset.summary.totalRefs,
            totalViews: dataset.summary.totalViews,
            totalLikes: dataset.summary.totalLikes,
            totalComments: dataset.summary.totalComments,
            totalThanks: dataset.summary.totalThanks,
            resumeListIndex: Number(dataset.resume?.currentListIndex) || 0,
            resumeNextPage: Number(dataset.resume?.nextPageNumber) || 1,
            resumeUpdatedAt: dataset.resume?.updatedAt || dataset.checkpointSavedAt || '',
            sizeBytes
        };
    }

    function buildEmptyDataset(params) {
        const sourceKind = params.sourceKind || 'library';
        const keys = getDatasetKeysForUser(params.host, params.viewerUser, params.targetUser, sourceKind);
        return {
            key: params.key || keys.resumeKey,
            baseKey: params.baseKey || keys.baseKey,
            kind: params.kind || 'resume',
            status: params.status || 'partial',
            schemaVersion: 2,
            scriptVersion: VERSION,
            sourceKind,
            host: params.host,
            viewerUser: params.viewerUser,
            viewerDisplayName: params.viewerDisplayName || '',
            targetUser: params.targetUser,
            targetDisplayName: params.targetDisplayName || params.targetUser,
            sourceUrl: params.sourceUrl,
            createdAt: new Date().toISOString(),
            scannedAt: '',
            checkpointSavedAt: '',
            settingsSnapshot: {
                timeoutMs: params.settings.timeoutMs,
                delayMs: params.settings.delayMs,
                retryCount: params.settings.retryCount,
                retryDelayMs: params.settings.retryDelayMs
            },
            pageMeta: {
                title: params.pageTitle || '',
                sectionTitle: params.sectionTitle || 'Danh sách đọc'
            },
            lists: [],
            booksById: {},
            bookIds: [],
            resume: {
                currentListIndex: 0,
                currentListId: '',
                currentListName: '',
                nextPageNumber: 1,
                updatedAt: '',
                baseElapsedMs: 0,
                savedRequestCount: 0,
                savedAttemptCount: 0
            },
            summary: {
                listCount: 0,
                uniqueBookCount: 0,
                totalRefs: 0,
                duplicateRefs: 0,
                totalViews: 0,
                totalLikes: 0,
                totalComments: 0,
                totalThanks: 0,
                privateBookCount: 0,
                publicListCount: 0,
                unknownVisibilityListCount: 0,
                requestCount: 0,
                attemptCount: 0,
                elapsedMs: 0
            }
        };
    }

    function createListRecord(raw, order) {
        return {
            listId: raw.listId,
            name: raw.name,
            nameNorm: stripDiacritics(raw.name),
            order,
            declaredCount: raw.declaredCount,
            actualCount: 0,
            isPublic: raw.isPublic,
            sourceType: raw.sourceType || 'library',
            bookmarkType: raw.bookmarkType || '',
            endpoint: raw.endpoint || '',
            pageCount: 0,
            pageSize: Number(raw.pageSize) || 0,
            scannedPages: 0,
            fullyScanned: false,
            bookIds: []
        };
    }

    function createCompleteDatasetFromResume(resumeDataset) {
        return {
            ...resumeDataset,
            key: resumeDataset.baseKey || getBaseKeyFromAnyKey(resumeDataset.key),
            baseKey: resumeDataset.baseKey || getBaseKeyFromAnyKey(resumeDataset.key),
            kind: 'complete',
            status: 'complete',
            checkpointSavedAt: '',
            resume: {
                currentListIndex: resumeDataset.lists.length,
                currentListId: '',
                currentListName: '',
                nextPageNumber: 1,
                updatedAt: new Date().toISOString(),
                baseElapsedMs: 0,
                savedRequestCount: resumeDataset.summary.requestCount || 0,
                savedAttemptCount: resumeDataset.summary.attemptCount || 0
            }
        };
    }

    function normalizeApiBook(rawBook) {
        const raw = JSON.parse(JSON.stringify(rawBook || {}));
        raw.link = toAbsoluteUrl(raw.link);
        raw.author_link = toAbsoluteUrl(raw.author_link);
        raw.search_wiki = toAbsoluteUrl(raw.search_wiki);
        raw.cover = raw.cover ? toAbsoluteUrl(raw.cover) : '';
        if (raw.user && typeof raw.user === 'object') {
            raw.user.link = toAbsoluteUrl(raw.user.link);
            raw.user.picture = raw.user.picture ? toAbsoluteUrl(raw.user.picture) : '';
            raw.user.cover_url = raw.user.cover_url ? toAbsoluteUrl(raw.user.cover_url) : '';
        }
        return {
            id: raw.id,
            titleVi: raw.title_vi || '',
            titleCv: raw.title_cv || '',
            titleCn: raw.title_cn || '',
            displayTitle: raw.title_vi || raw.title_cv || raw.title_cn || raw.id,
            authorVi: raw.author_vi || '',
            authorCv: raw.author_cv || '',
            authorCn: raw.author_cn || '',
            displayAuthor: raw.author_vi || raw.author_cv || raw.author_cn || 'Không rõ',
            url: raw.link || '',
            authorUrl: raw.author_link || '',
            searchWikiUrl: raw.search_wiki || '',
            searchGoogleUrl: raw.search_gg || '',
            coverUrl: raw.cover || '',
            bookmarkId: raw.bookmark_id || '',
            bookmarkType: raw.bookmark_type || '',
            bookmarkedChapterTitle: raw.bookmark_chapter?.title || '',
            bookmarkedChapterUrl: raw.bookmark_chapter?.link ? toAbsoluteUrl(raw.bookmark_chapter.link) : '',
            statusName: raw.attr_status?.name || '',
            statusUrl: raw.attr_status?.link ? toAbsoluteUrl(raw.attr_status.link) : '',
            genderName: raw.attr_gender?.name || '',
            ownerName: raw.user?.fullname || '',
            ownerUrl: raw.user?.link || '',
            ownerSlug: raw.user?.userslug || '',
            ownerPicture: raw.user?.picture || '',
            isPrivate: Boolean(raw.is_private),
            stats: {
                views: bookStatValue(raw.stats, 'view_total'),
                likes: bookStatValue(raw.stats, 'like_total'),
                comments: bookStatValue(raw.stats, 'comment_total'),
                thanks: bookStatValue(raw.stats, 'thank_total')
            },
            tagIds: Array.isArray(raw.attr_tag) ? raw.attr_tag.map(parseObjectId).filter(Boolean) : [],
            raw
        };
    }

    function mergeBook(dataset, listRecord, rawBook, pageNumber, indexInPage) {
        const normalized = normalizeApiBook(rawBook);
        if (!normalized.id) return;
        let book = dataset.booksById[normalized.id];
        if (!book) {
            book = {
                ...normalized,
                listIds: [],
                listNames: [],
                appearances: [],
                searchText: ''
            };
            dataset.booksById[normalized.id] = book;
            dataset.bookIds.push(normalized.id);
        } else {
            if (!book.coverUrl && normalized.coverUrl) book.coverUrl = normalized.coverUrl;
            if (!book.titleVi && normalized.titleVi) book.titleVi = normalized.titleVi;
            if (!book.titleCv && normalized.titleCv) book.titleCv = normalized.titleCv;
            if (!book.titleCn && normalized.titleCn) book.titleCn = normalized.titleCn;
            if (!book.authorVi && normalized.authorVi) book.authorVi = normalized.authorVi;
            if (!book.authorCv && normalized.authorCv) book.authorCv = normalized.authorCv;
            if (!book.authorCn && normalized.authorCn) book.authorCn = normalized.authorCn;
            if ((!book.displayAuthor || book.displayAuthor === 'Không rõ') && normalized.displayAuthor) {
                book.displayAuthor = normalized.displayAuthor;
            }
            if ((!book.displayTitle || book.displayTitle === book.id) && normalized.displayTitle) {
                book.displayTitle = normalized.displayTitle;
            }
            book.isPrivate = book.isPrivate || normalized.isPrivate;
            book.stats.views = Math.max(book.stats.views, normalized.stats.views);
            book.stats.likes = Math.max(book.stats.likes, normalized.stats.likes);
            book.stats.comments = Math.max(book.stats.comments, normalized.stats.comments);
            book.stats.thanks = Math.max(book.stats.thanks, normalized.stats.thanks);
            if (!book.ownerName && normalized.ownerName) book.ownerName = normalized.ownerName;
            if (!book.ownerUrl && normalized.ownerUrl) book.ownerUrl = normalized.ownerUrl;
            if (!book.ownerSlug && normalized.ownerSlug) book.ownerSlug = normalized.ownerSlug;
            if (!book.ownerPicture && normalized.ownerPicture) book.ownerPicture = normalized.ownerPicture;
            if (!book.statusName && normalized.statusName) book.statusName = normalized.statusName;
            if (!book.statusUrl && normalized.statusUrl) book.statusUrl = normalized.statusUrl;
            if (!book.genderName && normalized.genderName) book.genderName = normalized.genderName;
            if (!book.authorUrl && normalized.authorUrl) book.authorUrl = normalized.authorUrl;
            if (!book.searchWikiUrl && normalized.searchWikiUrl) book.searchWikiUrl = normalized.searchWikiUrl;
            if (!book.searchGoogleUrl && normalized.searchGoogleUrl) book.searchGoogleUrl = normalized.searchGoogleUrl;
            if (!book.raw || Object.keys(book.raw).length < Object.keys(normalized.raw).length) {
                book.raw = normalized.raw;
            }
            if ((!book.tagIds || !book.tagIds.length) && normalized.tagIds.length) {
                book.tagIds = normalized.tagIds.slice();
            }
        }
        if (!book.listIds.includes(listRecord.listId)) {
            book.listIds.push(listRecord.listId);
            book.listNames.push(listRecord.name);
        }
        book.appearances.push({
            listId: listRecord.listId,
            listName: listRecord.name,
            page: pageNumber,
            indexInPage,
            bookmarkId: normalized.bookmarkId || '',
            bookmarkedChapterTitle: normalized.bookmarkedChapterTitle || '',
            bookmarkedChapterUrl: normalized.bookmarkedChapterUrl || ''
        });
        if (!listRecord.bookIds.includes(book.id)) {
            listRecord.bookIds.push(book.id);
        }
        book.searchText = stripDiacritics([
            book.displayTitle,
            book.titleVi,
            book.titleCv,
            book.titleCn,
            book.displayAuthor,
            book.authorVi,
            book.authorCv,
            book.authorCn,
            book.ownerName,
            book.statusName,
            book.genderName,
            ...(book.listNames || [])
        ].join(' | '));
    }

    function finalizeDataset(dataset, elapsedMs, requestCount, attemptCount) {
        dataset.scannedAt = new Date().toISOString();
        dataset.status = 'complete';
        dataset.summary.listCount = dataset.lists.length;
        dataset.summary.uniqueBookCount = dataset.bookIds.length;
        dataset.summary.totalRefs = dataset.lists.reduce((sum, item) => sum + item.bookIds.length, 0);
        dataset.summary.duplicateRefs = dataset.summary.totalRefs - dataset.summary.uniqueBookCount;
        dataset.summary.totalViews = 0;
        dataset.summary.totalLikes = 0;
        dataset.summary.totalComments = 0;
        dataset.summary.totalThanks = 0;
        dataset.summary.privateBookCount = 0;
        dataset.summary.publicListCount = 0;
        dataset.summary.unknownVisibilityListCount = 0;
        dataset.summary.elapsedMs = elapsedMs;
        dataset.summary.requestCount = requestCount;
        dataset.summary.attemptCount = attemptCount;

        dataset.lists.forEach((list) => {
            list.actualCount = list.bookIds.length;
            if (list.isPublic === true) dataset.summary.publicListCount += 1;
            if (list.isPublic == null) dataset.summary.unknownVisibilityListCount += 1;
        });

        dataset.bookIds.forEach((bookId) => {
            const book = dataset.booksById[bookId];
            if (!book) return;
            dataset.summary.totalViews += book.stats.views;
            dataset.summary.totalLikes += book.stats.likes;
            dataset.summary.totalComments += book.stats.comments;
            dataset.summary.totalThanks += book.stats.thanks;
            if (book.isPrivate) dataset.summary.privateBookCount += 1;
        });
    }

    function estimateListRequestCount(list) {
        if (list.pageCount && list.pageCount > 0) return list.pageCount;
        const declared = Number(list.declaredCount) || 0;
        const pageSize = Number(list.pageSize) || DEFAULT_PAGE_SIZE_ESTIMATE;
        return Math.max(1, Math.ceil((declared || pageSize) / pageSize));
    }

    function estimateDatasetRequestCount(dataset) {
        return dataset.lists.reduce((sum, list) => sum + estimateListRequestCount(list), 0);
    }

    function countCompletedListRequests(dataset) {
        return dataset.lists.reduce((sum, list) => sum + (Number(list.scannedPages) || 0), 0);
    }

    async function saveResumeSnapshot(dataset, resumePatch = {}) {
        dataset.kind = 'resume';
        dataset.status = 'partial';
        dataset.checkpointSavedAt = new Date().toISOString();
        dataset.resume = {
            ...dataset.resume,
            ...resumePatch,
            updatedAt: new Date().toISOString(),
            savedRequestCount: countCompletedListRequests(dataset),
            savedAttemptCount: state.progress.attempts
        };
        finalizePartialDataset(dataset);
        await saveDataset(dataset);
        return dataset;
    }

    function finalizePartialDataset(dataset) {
        dataset.summary.listCount = dataset.lists.length;
        dataset.summary.uniqueBookCount = dataset.bookIds.length;
        dataset.summary.totalRefs = dataset.lists.reduce((sum, item) => sum + item.bookIds.length, 0);
        dataset.summary.duplicateRefs = dataset.summary.totalRefs - dataset.summary.uniqueBookCount;
        dataset.summary.totalViews = 0;
        dataset.summary.totalLikes = 0;
        dataset.summary.totalComments = 0;
        dataset.summary.totalThanks = 0;
        dataset.summary.privateBookCount = 0;
        dataset.summary.publicListCount = 0;
        dataset.summary.unknownVisibilityListCount = 0;
        dataset.summary.requestCount = countCompletedListRequests(dataset);
        dataset.summary.attemptCount = state.progress.attempts;
        const baseElapsedMs = Number(dataset.resume?.baseElapsedMs) || 0;
        dataset.summary.elapsedMs = baseElapsedMs + (state.progress.startedAt ? Date.now() - state.progress.startedAt : 0);

        dataset.lists.forEach((list) => {
            list.actualCount = list.bookIds.length;
            if (list.isPublic === true) dataset.summary.publicListCount += 1;
            if (list.isPublic == null) dataset.summary.unknownVisibilityListCount += 1;
        });

        dataset.bookIds.forEach((bookId) => {
            const book = dataset.booksById[bookId];
            if (!book) return;
            dataset.summary.totalViews += book.stats.views;
            dataset.summary.totalLikes += book.stats.likes;
            dataset.summary.totalComments += book.stats.comments;
            dataset.summary.totalThanks += book.stats.thanks;
            if (book.isPrivate) dataset.summary.privateBookCount += 1;
        });
    }

    async function deleteResumeDataset(baseKey) {
        const resumeKey = buildResumeKey(baseKey);
        await deleteDataset(resumeKey);
    }

    function findMetaByKey(key) {
        return state.metaList.find((item) => item.key === key) || null;
    }

    function preferredDatasetKeyForUser(targetUser, viewerUser = state.viewerUser || 'anonymous') {
        const normalizedTarget = normalizeUserSlug(targetUser);
        if (!normalizedTarget) return '';
        const keys = getDatasetKeysForUser(location.hostname, viewerUser || 'anonymous', normalizedTarget, state.sourceKind);
        if (findMetaByKey(keys.resumeKey)) return keys.resumeKey;
        if (findMetaByKey(keys.baseKey)) return keys.baseKey;
        return '';
    }

    function metaForTargetUser(targetUser, kind, viewerUser = state.viewerUser || 'anonymous') {
        const normalizedTarget = normalizeUserSlug(targetUser);
        if (!normalizedTarget) return null;
        const keys = getDatasetKeysForUser(location.hostname, viewerUser || 'anonymous', normalizedTarget, state.sourceKind);
        return kind === 'resume' ? findMetaByKey(keys.resumeKey) : findMetaByKey(keys.baseKey);
    }

    function parseLibraryPage(doc) {
        const targetDisplayName = doc.querySelector('.avatar-wrapper .name')?.textContent.trim()
            || doc.querySelector('h1.name')?.textContent.trim()
            || '';
        const sectionTitle = doc.querySelector('.carousel-title')?.textContent.trim() || 'Danh sách đọc';
        const lists = Array.from(doc.querySelectorAll('.collapsible-group[data-id]')).map((node, index) => {
            const countText = node.querySelector('.collection-count')?.textContent || '';
            const declaredCount = Number(countText.replace(/[^0-9]/g, '')) || 0;
            const visibilityCheckbox = node.querySelector('.switch input[type="checkbox"]');
            return {
                listId: node.getAttribute('data-id') || '',
                name: node.querySelector('.collection-name')?.textContent.trim() || `Danh sách ${index + 1}`,
                declaredCount,
                isPublic: visibilityCheckbox ? visibilityCheckbox.checked : null,
                sourceType: 'library'
            };
        }).filter((item) => item.listId);

        return {
            targetDisplayName,
            pageTitle: doc.title || '',
            sectionTitle,
            lists
        };
    }

    function parseBookmarkIndexPage(doc, targetUser) {
        const targetDisplayName = doc.querySelector('.avatar-wrapper .name')?.textContent.trim()
            || doc.querySelector('h1.name')?.textContent.trim()
            || '';
        const byType = new Map();

        Array.from(doc.querySelectorAll('.top-bar-btns a[href*="/bookmarks/"]')).forEach((node) => {
            const href = node.getAttribute('href') || '';
            const match = href.match(/\/bookmarks\/(reading|favorite)(?:[/?#]|$)/i);
            if (!match) return;
            const bookmarkType = match[1].toLowerCase();
            const text = node.textContent.replace(/\s+/g, ' ').trim();
            const declaredCountMatch = text.match(/\(([\d.,\s]+)\)\s*$/);
            const declaredCount = declaredCountMatch
                ? Number(declaredCountMatch[1].replace(/[^0-9]/g, '')) || 0
                : 0;
            const defaultName = bookmarkType === 'reading' ? 'Đang đọc' : 'Yêu thích';
            byType.set(bookmarkType, {
                listId: `bookmarks:${bookmarkType}`,
                name: text.replace(/\s*\([\d.,\s]+\)\s*$/, '').trim() || defaultName,
                declaredCount,
                isPublic: null,
                sourceType: 'bookmarks',
                bookmarkType,
                endpoint: `/user/${encodeURIComponent(targetUser)}/bookmarks/${bookmarkType}`,
                pageSize: BOOKMARK_PAGE_SIZE
            });
        });

        const lists = ['reading', 'favorite'].map((type) => byType.get(type)).filter(Boolean);
        return {
            targetDisplayName,
            pageTitle: doc.title || '',
            sectionTitle: 'Bookmarks',
            lists
        };
    }

    function parseArchivePage(doc, targetUser, sourceKind) {
        return sourceKind === 'bookmarks'
            ? parseBookmarkIndexPage(doc, targetUser)
            : parseLibraryPage(doc);
    }

    function textAfterLabel(root, label) {
        if (!root) return '';
        const expected = stripDiacritics(label).replace(/\s*:\s*$/, '');
        const nodes = Array.from(root.querySelectorAll('p'));
        for (const node of nodes) {
            const text = node.textContent.replace(/\s+/g, ' ').trim();
            const colonIndex = text.indexOf(':');
            if (colonIndex < 0) continue;
            const actualLabel = stripDiacritics(text.slice(0, colonIndex));
            if (actualLabel === expected) {
                return text.slice(colonIndex + 1).trim();
            }
        }
        return '';
    }

    function decodeChineseAuthorFromUrl(url) {
        if (!url) return '';
        try {
            const parsed = new URL(url, location.origin);
            const encodedName = parsed.pathname.split('/').filter(Boolean).pop() || '';
            const decodedName = decodeURIComponent(encodedName).trim();
            return /[\u3400-\u9fff\uf900-\ufaff]/u.test(decodedName) ? decodedName : '';
        } catch (_) {
            return '';
        }
    }

    function parseGoogleOriginalNames(url) {
        if (!url) return { titleCn: '', authorCn: '' };
        try {
            const query = new URL(url, location.origin).searchParams.get('q') || '';
            const parts = query.split(/\s+\+\s+/).map((item) => item.trim()).filter(Boolean);
            return {
                titleCn: parts[0] || '',
                authorCn: parts.slice(1).join(' + ') || ''
            };
        } catch (_) {
            return { titleCn: '', authorCn: '' };
        }
    }

    function parseWikiSearchTitle(url) {
        if (!url) return '';
        try {
            return (new URL(url, location.origin).searchParams.get('q') || '').replace(/\s+/g, ' ').trim();
        } catch (_) {
            return '';
        }
    }

    function bookmarkBookId(bookUrl, bookmarkId, titleCn, authorCn) {
        if (bookUrl) {
            try {
                return `bookmark:${new URL(bookUrl, location.origin).pathname}`;
            } catch (_) {}
        }
        const originalKey = [titleCn, authorCn].filter(Boolean).join('::');
        return `bookmark:${originalKey || bookmarkId}`;
    }

    function parseBookmarkBook(node, doc, bookmarkType) {
        const bookmarkInput = node.querySelector('input[name="chapterId"]');
        const bookmarkId = bookmarkInput?.value || '';
        const titleNode = node.querySelector('.book-title');
        const authorNode = node.querySelector('.book-author a');
        const chapterNode = node.querySelector('.chapter-name a');
        const bookLinkNode = node.querySelector('.cover-wrapper[href]');
        const optionLink = node.querySelector('.option a[href^="#"]');
        const modalId = optionLink?.getAttribute('href')?.slice(1) || '';
        const modal = modalId ? doc.getElementById(modalId) : null;
        const googleUrl = modal?.querySelector('a[href*="google."][href*="/search"]')?.getAttribute('href') || '';
        const wikiUrl = modal?.querySelector('a[href*="/tim-kiem"]')?.getAttribute('href') || '';
        const googleNames = parseGoogleOriginalNames(googleUrl);
        const authorUrl = authorNode?.getAttribute('href') || '';
        const titleCn = textAfterLabel(modal?.querySelector('.modal-content'), 'Tên truyện gốc')
            || googleNames.titleCn;
        const authorCn = textAfterLabel(modal?.querySelector('.modal-content'), 'Tên tác giả gốc')
            || decodeChineseAuthorFromUrl(authorUrl)
            || googleNames.authorCn;
        const titleVi = titleNode?.textContent.replace(/\s+/g, ' ').trim() || titleCn || '';
        const authorVi = authorNode?.textContent.replace(/\s+/g, ' ').trim() || authorCn || '';
        const titleCv = parseWikiSearchTitle(wikiUrl);
        const bookUrl = toAbsoluteUrl(bookLinkNode?.getAttribute('href') || titleNode?.getAttribute('href') || '');
        const chapterUrl = toAbsoluteUrl(chapterNode?.getAttribute('href') || titleNode?.getAttribute('href') || '');
        const chapterTitle = chapterNode?.textContent.replace(/\s+/g, ' ').trim() || '';

        return {
            id: bookmarkBookId(bookUrl, bookmarkId, titleCn, authorCn),
            bookmark_id: bookmarkId,
            bookmark_type: bookmarkType,
            title_vi: titleVi,
            title_cv: titleCv,
            title_cn: titleCn,
            author_vi: authorVi,
            author_cv: authorVi,
            author_cn: authorCn,
            link: bookUrl,
            author_link: authorUrl,
            search_wiki: wikiUrl,
            search_gg: googleUrl,
            cover: node.querySelector('.book-cover img')?.getAttribute('src') || '',
            bookmark_chapter: {
                id: bookmarkId,
                title: chapterTitle,
                link: chapterUrl
            }
        };
    }

    function parseBookmarkListPage(doc, listRecord) {
        const books = Array.from(doc.querySelectorAll('#formBook .book-list .book-info'))
            .map((node) => parseBookmarkBook(node, doc, listRecord.bookmarkType))
            .filter((book) => book.id && (book.title_vi || book.title_cn));
        const starts = Array.from(doc.querySelectorAll('.pagination a[href*="start="]')).map((node) => {
            try {
                return Number(new URL(node.getAttribute('href') || '', location.origin).searchParams.get('start')) || 0;
            } catch (_) {
                return 0;
            }
        }).filter((value) => value > 0);
        const pageSize = Number(listRecord.pageSize) || (starts.length ? Math.min(...starts) : BOOKMARK_PAGE_SIZE);
        const pageCountFromLinks = starts.length ? Math.floor(Math.max(...starts) / pageSize) + 1 : 1;
        const pageCountFromCount = listRecord.declaredCount
            ? Math.max(1, Math.ceil(listRecord.declaredCount / pageSize))
            : 1;

        return {
            books,
            page_size: pageSize,
            last_page: Math.max(pageCountFromLinks, pageCountFromCount)
        };
    }

    function guideTitle() {
        if (state.guideMode === 'welcome') {
            return 'Chào mừng đến với Library & Bookmarks Archiver';
        }
        if (state.guideMode === 'update') {
            return 'Bản cập nhật mới của Library & Bookmarks Archiver';
        }
        return 'Hướng dẫn nhanh';
    }

    function guideMetaText() {
        if (state.guideMode === 'update') {
            return `Từ ${state.previousVersion || 'bản cũ'} lên ${VERSION}`;
        }
        return `Phiên bản ${VERSION}`;
    }

    function buildGuideContent() {
        if (state.guideMode === 'update') {
            return `
                <div class="guide-section">
                    <h3>Điểm mới trong bản ${escapeHtml(VERSION)}</h3>
                    <ul class="guide-list">
                        <li>Hỗ trợ domain mới <strong>wikicv.org</strong> và trang <code>/bookmarks</code>.</li>
                        <li>Quét đủ hai nhóm <strong>Đang đọc</strong> và <strong>Yêu thích</strong>, kể cả toàn bộ trang phân trang.</li>
                        <li>Lưu riêng tên truyện/tác giả hiển thị và nguyên văn tiếng Trung lấy từ popup tìm kiếm của từng truyện.</li>
                        <li>Thêm popup welcome/update/helper và nút <strong>?</strong> để mở lại hướng dẫn bất kỳ lúc nào.</li>
                        <li>Checkpoint quét dở giờ được giữ riêng, vào lại đúng user sẽ tự trỏ tới dataset tạm và nút quét đổi thành <strong>Tiếp tục</strong>.</li>
                        <li>Khi đổi sang user khác trên trang thư viện, script ưu tiên dataset đúng <strong>viewer + target</strong> hiện tại để tránh trỏ nhầm và ghi đè ngoài ý muốn.</li>
                        <li>Export HTML vẫn hỗ trợ tự nhúng bìa, nhưng phần tải bìa giờ có retry riêng và chạy song song nên nhanh hơn rõ rệt.</li>
                        <li>Nếu bỏ chọn nhúng bìa, HTML sẽ giữ URL ảnh gốc như web đang dùng để trình duyệt tự tải ảnh nhanh hơn.</li>
                    </ul>
                </div>
                <div class="guide-section">
                    <h3>Mẹo dùng nhanh</h3>
                    <ul class="guide-list">
                        <li>Muốn file HTML mở local vẫn chắc ăn có bìa thì cứ để checkbox nhúng bìa bật.</li>
                        <li>Muốn xuất nhanh như giao diện web thì tắt nhúng bìa trước khi bấm <strong>HTML</strong>.</li>
                        <li>Nếu quét thư viện lớn, tăng timeout nhẹ và để delay vừa phải để ETA bớt nhảy.</li>
                    </ul>
                </div>
            `;
        }

        return `
            <div class="guide-section">
                <h3>Script này làm gì</h3>
                <p>Library & Bookmarks Archiver quét toàn bộ thư viện hoặc Bookmarks của user hiện tại, lưu theo <code>host + viewer + target + nguồn</code>, giữ được nhiều dataset và xuất ra JSON, TXT hoặc HTML dễ đọc.</p>
            </div>
            <div class="guide-section">
                <h3>Flow gợi ý</h3>
                <ul class="guide-list">
                    <li>Ở trang <code>/user/.../thu-vien</code> hoặc <code>/user/.../bookmarks</code>, bấm <strong>Dùng user trang hiện tại</strong> hoặc nhập slug user cần quét.</li>
                    <li>Trên trang Bookmarks, một lần quét sẽ lấy cả <strong>Đang đọc</strong> lẫn <strong>Yêu thích</strong>, cùng tên/tác giả Việt–Trung.</li>
                    <li>Nhấn <strong>Quét ngay</strong>. Nếu đã có checkpoint dở, nút sẽ đổi thành <strong>Tiếp tục</strong>.</li>
                    <li>Theo dõi khối <strong>Tiến Trình</strong> để xem request đã chạy, ETA và log retry.</li>
                    <li>Khi quét xong, nạp dataset rồi xem trước, lọc truyện theo danh sách hoặc từ khóa, sau đó xuất JSON, TXT hay HTML. Nên dùng <strong>HTML</strong> để dễ xem. </li>
                </ul>
            </div>
            <div class="guide-section">
                <h3>Về ảnh bìa HTML</h3>
                <ul class="guide-list">
                    <li>Bật nhúng bìa: file nặng hơn nhưng mở local vẫn ít phụ thuộc web hơn.</li>
                    <li>Tắt nhúng bìa: HTML dùng URL ảnh gốc như trang web nên xuất nhanh hơn và trình duyệt tải bìa song song.</li>
                </ul>
            </div>
            <div class="guide-note">
                <strong>Tip:</strong> nút <strong>?</strong> trên header sẽ mở lại bảng hướng dẫn này bất cứ lúc nào.
            </div>
        `;
    }

    function renderGuideModal() {
        const title = guideTitle();
        return `
            <div class="guide${state.guideOpen ? ' is-open' : ''}">
                <div class="guide-backdrop" data-action="close-guide"></div>
                <div class="guide-card" role="dialog" aria-modal="true" aria-label="${escapeAttr(title)}">
                    <div class="guide-head">
                        <div class="guide-kicker">${state.guideMode === 'update' ? 'Update Notes' : 'Quick Guide'}</div>
                        <h3 class="guide-title">${escapeHtml(title)}</h3>
                        <div class="guide-meta">
                            <span class="guide-badge">${escapeHtml(guideMetaText())}</span>
                        </div>
                    </div>
                    <div class="guide-body">
                        ${buildGuideContent()}
                    </div>
                    <div class="guide-actions">
                        ${state.panelOpen ? '' : `<button type="button" class="btn-alt" data-action="open-panel">Mở panel</button>`}
                        <button type="button" class="btn" data-action="close-guide">Đóng</button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderGuide() {
        if (!state.shadow) return;
        const root = state.shadow.getElementById(id('guide-root'));
        if (!root) return;
        root.innerHTML = renderGuideModal();
    }

    function openGuide(mode = 'help') {
        state.guideMode = mode;
        state.guideOpen = true;
        renderGuide();
    }

    function closeGuide() {
        if (!state.guideOpen) return;
        state.guideOpen = false;
        renderGuide();
    }

    function runVersionCheck() {
        if (state.versionChecked) return;
        state.versionChecked = true;

        const storedVersion = safeGetValue(VERSION_STORAGE_KEY, '');
        if (!storedVersion) {
            state.previousVersion = '';
            state.guideMode = 'welcome';
            state.guideOpen = true;
            safeSetValue(VERSION_STORAGE_KEY, VERSION);
            renderGuide();
            return;
        }

        if (String(storedVersion) !== VERSION) {
            state.previousVersion = String(storedVersion);
            state.guideMode = 'update';
            state.guideOpen = true;
            safeSetValue(VERSION_STORAGE_KEY, VERSION);
            renderGuide();
            return;
        }

        safeSetValue(VERSION_STORAGE_KEY, VERSION);
        renderGuide();
    }

    function initProgress(mode, total, stage, options = {}) {
        const delayValue = Number(options.delayMs);
        state.progress = {
            mode,
            startedAt: Date.now(),
            total,
            completed: 0,
            attempts: 0,
            attemptDurationMs: 0,
            stage: stage || '',
            currentLabel: '',
            extra: '',
            delayMs: Number.isFinite(delayValue)
                ? clamp(delayValue, 0, 60000)
                : (mode === 'scan' ? clamp(Number(state.settings.delayMs) || 0, 0, 60000) : 0)
        };
        renderProgress();
    }

    function setProgressStage(stage, currentLabel = '', extra = '') {
        state.progress.stage = stage;
        if (currentLabel) state.progress.currentLabel = currentLabel;
        state.progress.extra = extra;
        renderProgress();
    }

    function addProgressAttempt(durationMs) {
        state.progress.attempts += 1;
        state.progress.attemptDurationMs += Math.max(0, Number(durationMs) || 0);
        renderProgress();
    }

    function completeProgressUnit(label) {
        state.progress.completed += 1;
        state.progress.currentLabel = label || state.progress.currentLabel;
        renderProgress();
    }

    function setProgressTotal(total) {
        state.progress.total = Math.max(total, state.progress.completed);
        renderProgress();
    }

    function progressEtaMs() {
        if (!state.progress.startedAt || state.progress.total <= state.progress.completed) return 0;
        const avgRequestMs = state.progress.attempts
            ? state.progress.attemptDurationMs / state.progress.attempts
            : 0;
        const remaining = Math.max(state.progress.total - state.progress.completed, 0);
        const delayMs = clamp(Number(state.progress.delayMs) || 0, 0, 60000);
        return (remaining * avgRequestMs) + (Math.max(remaining - 1, 0) * delayMs);
    }

    function checkAbort() {
        if (state.abortScan) throw new Error('SCAN_ABORTED');
    }

    async function fetchWithRetry(url, options) {
        const timeoutValue = Number(options.timeoutMs);
        const retryCountValue = Number(options.retryCount);
        const retryDelayValue = Number(options.retryDelayMs);
        const timeoutMs = clamp(
            Number.isFinite(timeoutValue) && timeoutValue > 0 ? timeoutValue : state.settings.timeoutMs,
            1000,
            180000
        );
        const retryCount = clamp(
            Number.isFinite(retryCountValue) && retryCountValue >= 0 ? retryCountValue : state.settings.retryCount,
            0,
            10
        );
        const retryDelayMs = clamp(
            Number.isFinite(retryDelayValue) && retryDelayValue >= 0 ? retryDelayValue : state.settings.retryDelayMs,
            0,
            120000
        );
        const attempts = retryCount + 1;
        let lastError = null;

        for (let attempt = 1; attempt <= attempts; attempt += 1) {
            checkAbort();
            const controller = new AbortController();
            const timer = window.setTimeout(() => controller.abort(), timeoutMs);
            const started = performance.now();
            try {
                const response = await fetch(url, {
                    credentials: 'include',
                    cache: options.cache || 'no-store',
                    signal: controller.signal,
                    headers: options.headers || {}
                });
                window.clearTimeout(timer);
                addProgressAttempt(performance.now() - started);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response;
            } catch (error) {
                window.clearTimeout(timer);
                addProgressAttempt(performance.now() - started);
                lastError = error instanceof Error ? error : new Error(String(error));
                if (attempt >= attempts) {
                    throw lastError;
                }
                addLog(`${options.label || 'Request'} lỗi: ${lastError.message}. Thử lại ${attempt}/${retryCount} sau ${fmtDuration(retryDelayMs)}.`, 'warn');
                await sleepWithAbort(retryDelayMs);
            }
        }

        throw lastError || new Error('Request failed');
    }

    async function fetchHtmlDocument(url, label) {
        const response = await fetchWithRetry(url, {
            label,
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        });
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        completeProgressUnit(label);
        return doc;
    }

    async function fetchBookListJson(listId, start) {
        const url = new URL(`/book-list/${listId}`, location.origin);
        url.searchParams.set('start', String(start));
        url.searchParams.set('pageSize', String(DEFAULT_PAGE_SIZE_ESTIMATE));
        const label = `List ${listId} @ ${start}`;
        const response = await fetchWithRetry(url.href, {
            label,
            headers: {
                accept: 'application/json, text/plain, */*',
                'x-requested-with': 'XMLHttpRequest'
            }
        });
        const text = await response.text();
        let json;
        try {
            json = JSON.parse(text);
        } catch (error) {
            throw new Error(`JSON không hợp lệ cho list ${listId}`);
        }
        if (!json || Number(json.err) !== 0 || !json.data) {
            throw new Error(`API trả err=${json && json.err}`);
        }
        completeProgressUnit(label);
        return json.data;
    }

    async function fetchBookmarkListPage(listRecord, targetUser, start) {
        const endpoint = listRecord.endpoint
            || `/user/${encodeURIComponent(targetUser)}/bookmarks/${listRecord.bookmarkType}`;
        const url = new URL(endpoint, location.origin);
        if (start > 0) url.searchParams.set('start', String(start));
        const label = `${listRecord.name} @ ${start}`;
        const response = await fetchWithRetry(url.href, {
            label,
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        });
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        if (!doc.querySelector('.top-bar-btns a[href*="/bookmarks/"]')) {
            throw new Error('Không đọc được Bookmarks. Hãy kiểm tra đăng nhập và quyền xem trang.');
        }
        completeProgressUnit(label);
        return parseBookmarkListPage(doc, listRecord);
    }

    function fetchListPage(listRecord, targetUser, start) {
        return listRecord.sourceType === 'bookmarks'
            ? fetchBookmarkListPage(listRecord, targetUser, start)
            : fetchBookListJson(listRecord.listId, start);
    }

    async function startScan(targetUserInput) {
        if (state.scanning) {
            notify('Đang có một phiên quét khác.', true);
            return;
        }

        const targetUser = normalizeUserSlug(targetUserInput);
        if (!targetUser) {
            notify('Thiếu user cần quét.', true);
            return;
        }

        const viewer = getViewerIdentity();
        state.viewerUser = viewer.slug || 'anonymous';
        state.viewerDisplayName = viewer.displayName;
        const sourceKind = state.sourceKind || getSourceKind();
        const sourceLabel = sourceKindLabel(sourceKind);
        const keys = getDatasetKeysForUser(location.hostname, state.viewerUser || 'anonymous', targetUser, sourceKind);
        const resumeMeta = findMetaByKey(keys.resumeKey);
        const completeMeta = findMetaByKey(keys.baseKey);
        const willResume = Boolean(resumeMeta);

        if (!willResume && completeMeta) {
            const proceed = window.confirm(
                `Đã có dataset full cho "${targetUser}" lúc ${fmtDateTime(completeMeta.scannedAt)}.\n` +
                'Nếu quét xong lần này, bản full cũ sẽ bị ghi đè.\n' +
                'Tiếp tục?'
            );
            if (!proceed) {
                addLog(`Đã hủy quét mới cho "${targetUser}" vì sẽ ghi đè dataset full cũ.`, 'warn');
                return;
            }
            addLog(`Cảnh báo: khi hoàn tất, dataset full của "${targetUser}" sẽ bị ghi đè.`, 'warn');
        }

        state.scanning = true;
        state.abortScan = false;
        showPanel();
        focusProgressCard();
        if (!willResume) {
            state.dataset = null;
            renderSummary();
            renderPreview();
        }
        renderUiState();
        addLog(`${willResume ? 'Tiếp tục' : 'Bắt đầu'} quét ${sourceLabel.toLowerCase()} cho "${targetUser}".`);

        const archiveUrl = sourceKind === 'bookmarks'
            ? `${location.origin}/user/${encodeURIComponent(targetUser)}/bookmarks`
            : `${location.origin}/user/${encodeURIComponent(targetUser)}/thu-vien`;
        const startedAt = Date.now();
        let logicalRequests = 0;
        let dataset = null;
        let isResume = willResume;

        try {
            if (isResume) {
                dataset = state.dataset && state.dataset.key === keys.resumeKey
                    ? state.dataset
                    : await getDataset(keys.resumeKey);
                if (!dataset) {
                    addLog('Không đọc được checkpoint cũ, chuyển sang quét mới.', 'warn');
                    isResume = false;
                } else {
                    dataset.viewerUser = state.viewerUser || 'anonymous';
                    dataset.viewerDisplayName = state.viewerDisplayName || '';
                    dataset.resume = dataset.resume || {};
                    dataset.resume.baseElapsedMs = Number(dataset.summary?.elapsedMs) || 0;
                    state.dataset = dataset;
                    state.selectedKey = dataset.key;
                    renderSummary();
                    renderPreview();
                }
            }

            if (!isResume) {
                logicalRequests = 1;
                initProgress('scan', logicalRequests, `Đọc trang ${sourceLabel}`);
                setProgressStage(`Đọc trang ${sourceLabel}`, targetUser);
                const archiveDoc = await fetchHtmlDocument(archiveUrl, `Trang ${sourceLabel}`);
                const parsedPage = parseArchivePage(archiveDoc, targetUser, sourceKind);
                if (!parsedPage.lists.length) {
                    const detail = sourceKind === 'bookmarks'
                        ? 'Không tìm thấy Đang đọc/Yêu thích. Hãy kiểm tra đăng nhập và quyền xem Bookmarks.'
                        : 'Không tìm thấy danh sách nào. Có thể thư viện trống hoặc bạn không có quyền xem.';
                    throw new Error(detail);
                }

                dataset = buildEmptyDataset({
                    sourceKind,
                    host: location.hostname,
                    viewerUser: state.viewerUser || 'anonymous',
                    viewerDisplayName: state.viewerDisplayName || '',
                    targetUser,
                    targetDisplayName: parsedPage.targetDisplayName || targetUser,
                    sourceUrl: archiveUrl,
                    pageTitle: parsedPage.pageTitle,
                    sectionTitle: parsedPage.sectionTitle,
                    settings: state.settings
                });
                dataset.lists = parsedPage.lists.map((item, index) => createListRecord(item, index));
                logicalRequests = 1 + estimateDatasetRequestCount(dataset);
                setProgressTotal(logicalRequests);
                state.dataset = dataset;
                state.selectedKey = dataset.key;
                await saveResumeSnapshot(dataset, {
                    currentListIndex: 0,
                    currentListId: '',
                    currentListName: '',
                    nextPageNumber: 1
                });
                await refreshMetaList({ forcePreferred: true, preferredTargetUser: targetUser });
                renderSummary();
                renderPreview();
                addLog(`Phát hiện ${fmtNum(dataset.lists.length)} danh sách.`);
            } else {
                logicalRequests = Math.max(1, estimateDatasetRequestCount(dataset));
                initProgress('scan', logicalRequests, 'Tiếp tục phiên quét dở');
                state.progress.completed = countCompletedListRequests(dataset);
                setProgressStage(
                    'Tiếp tục phiên quét dở',
                    dataset.resume?.currentListName || dataset.targetDisplayName || targetUser,
                    `Đã có ${fmtNum(dataset.summary.uniqueBookCount)} truyện tạm`
                );
                renderProgress();
            }

            for (let listIndex = 0; listIndex < dataset.lists.length; listIndex += 1) {
                checkAbort();
                const listRecord = dataset.lists[listIndex];
                if (listRecord.fullyScanned || (listRecord.pageCount > 0 && listRecord.scannedPages >= listRecord.pageCount)) {
                    listRecord.fullyScanned = true;
                    continue;
                }

                addLog(`Quét "${listRecord.name}"...`);

                if (!listRecord.scannedPages) {
                    setProgressStage(
                        `Đang quét danh sách ${listIndex + 1}/${dataset.lists.length}`,
                        `${listRecord.name} (trang 1)`
                    );
                    const firstPage = await fetchListPage(listRecord, targetUser, 0);
                    const parsedPageCount = Number(firstPage.last_page) || 1;
                    listRecord.pageCount = parsedPageCount;
                    listRecord.pageSize = Number(firstPage.page_size) || DEFAULT_PAGE_SIZE_ESTIMATE;
                    setProgressTotal((isResume ? 0 : 1) + estimateDatasetRequestCount(dataset));

                    const firstBooks = Array.isArray(firstPage.books) ? firstPage.books : [];
                    firstBooks.forEach((book, indexInPage) => {
                        mergeBook(dataset, listRecord, book, 1, indexInPage);
                    });
                    listRecord.scannedPages = 1;
                    listRecord.fullyScanned = listRecord.pageCount <= 1;
                    await saveResumeSnapshot(dataset, {
                        currentListIndex: listIndex,
                        currentListId: listRecord.listId,
                        currentListName: listRecord.name,
                        nextPageNumber: listRecord.fullyScanned ? 1 : 2
                    });
                    state.dataset = dataset;
                    renderSummary();
                    renderPreview();
                }

                for (let pageNumber = listRecord.scannedPages + 1; pageNumber <= listRecord.pageCount; pageNumber += 1) {
                    checkAbort();
                    await sleepWithAbort(clamp(Number(state.settings.delayMs) || 0, 0, 60000));
                    setProgressStage(
                        `Đang quét danh sách ${listIndex + 1}/${dataset.lists.length}`,
                        `${listRecord.name} (trang ${pageNumber}/${listRecord.pageCount})`
                    );
                    const start = (pageNumber - 1) * listRecord.pageSize;
                    const pageData = await fetchListPage(listRecord, targetUser, start);
                    const books = Array.isArray(pageData.books) ? pageData.books : [];
                    books.forEach((book, indexInPage) => {
                        mergeBook(dataset, listRecord, book, pageNumber, indexInPage);
                    });
                    listRecord.scannedPages = pageNumber;
                    listRecord.fullyScanned = pageNumber >= listRecord.pageCount;
                    await saveResumeSnapshot(dataset, {
                        currentListIndex: listIndex,
                        currentListId: listRecord.listId,
                        currentListName: listRecord.name,
                        nextPageNumber: listRecord.fullyScanned ? 1 : (pageNumber + 1)
                    });
                    state.dataset = dataset;
                    renderSummary();
                    renderPreview();
                }
                if (!listRecord.pageCount) {
                    listRecord.pageCount = listRecord.scannedPages || 1;
                }
                listRecord.fullyScanned = true;
            }

            finalizeDataset(
                dataset,
                (Number(dataset.resume?.baseElapsedMs) || 0) + (Date.now() - startedAt),
                state.progress.completed,
                state.progress.attempts
            );
            setProgressStage('Lưu IndexedDB', dataset.targetDisplayName, `Tổng ${fmtNum(dataset.summary.uniqueBookCount)} truyện`);
            const finalDataset = createCompleteDatasetFromResume(dataset);
            finalDataset.scannedAt = dataset.scannedAt;
            await saveDataset(finalDataset);
            await deleteResumeDataset(finalDataset.baseKey);
            addLog(`Đã lưu dataset ${finalDataset.key}.`, 'success');
            state.dataset = finalDataset;
            state.selectedKey = finalDataset.key;
            await refreshMetaList({ forcePreferred: true, preferredTargetUser: targetUser });
            syncInputsFromState();
            notify(`Quét xong ${fmtNum(finalDataset.summary.uniqueBookCount)} truyện trong ${fmtNum(finalDataset.summary.listCount)} danh sách.`);
        } catch (error) {
            if (error && error.message === 'SCAN_ABORTED') {
                if (dataset) {
                    await saveResumeSnapshot(dataset, {
                        currentListIndex: Math.max(0, Number(dataset.resume?.currentListIndex) || 0),
                        currentListId: dataset.resume?.currentListId || '',
                        currentListName: dataset.resume?.currentListName || '',
                        nextPageNumber: Math.max(1, Number(dataset.resume?.nextPageNumber) || 1)
                    });
                    state.dataset = dataset;
                    state.selectedKey = dataset.key;
                    await refreshMetaList({ forcePreferred: true, preferredTargetUser: targetUser });
                }
                addLog('Đã dừng quét theo yêu cầu.', 'warn');
                notify('Đã dừng quét.', true);
            } else {
                if (dataset) {
                    try {
                        await saveResumeSnapshot(dataset, {
                            currentListIndex: Math.max(0, Number(dataset.resume?.currentListIndex) || 0),
                            currentListId: dataset.resume?.currentListId || '',
                            currentListName: dataset.resume?.currentListName || '',
                            nextPageNumber: Math.max(1, Number(dataset.resume?.nextPageNumber) || 1)
                        });
                        state.dataset = dataset;
                        state.selectedKey = dataset.key;
                        await refreshMetaList({ forcePreferred: true, preferredTargetUser: targetUser });
                    } catch (_) {}
                }
                console.error('[LibraryArchiver] scan', error);
                addLog(`Quét thất bại: ${error && error.message ? error.message : String(error)}`, 'error');
                notify('Quét thất bại. Xem log để biết chi tiết.', true);
            }
        } finally {
            if (!state.dataset && dataset) {
                renderSummary();
                renderPreview();
            }
            state.scanning = false;
            state.abortScan = false;
            if (state.progress.mode === 'scan') {
                state.progress.extra = state.dataset
                    ? `Xong sau ${fmtDuration(state.dataset.summary.elapsedMs)}`
                    : state.progress.extra;
            }
            renderUiState();
            renderProgress();
            renderSummary();
            renderPreview();
        }
    }

    async function refreshMetaList(options = {}) {
        const {
            forcePreferred = false,
            preferredTargetUser = state.currentPageUser
        } = options;
        state.metaList = (await getMetaList())
            .sort((a, b) => new Date(b.scannedAt || 0).getTime() - new Date(a.scannedAt || 0).getTime());

        const selectedStillExists = state.selectedKey
            ? state.metaList.some((item) => item.key === state.selectedKey)
            : false;
        const preferredKey = preferredDatasetKeyForUser(preferredTargetUser, state.viewerUser || 'anonymous');

        if (forcePreferred) {
            state.selectedKey = preferredKey || '';
        } else if (!selectedStillExists) {
            state.selectedKey = preferredKey || '';
        }

        renderDatasetOptions();
        renderScanNotice();
    }

    async function loadSelectedDataset(key) {
        if (!key) {
            state.selectedKey = '';
            state.dataset = null;
            renderDatasetOptions();
            renderSummary();
            renderPreview();
            renderUiState();
            return;
        }
        state.selectedKey = key;
        renderDatasetOptions();
        const dataset = await getDataset(key);
        if (!dataset) {
            state.dataset = null;
            await refreshMetaList({ forcePreferred: true });
            renderSummary();
            renderPreview();
            renderUiState();
            return;
        }
        dataset.baseKey = dataset.baseKey || getBaseKeyFromAnyKey(dataset.key);
        dataset.kind = inferDatasetKind(dataset);
        dataset.status = inferDatasetStatus(dataset);
        dataset.resume = dataset.resume || {
            currentListIndex: 0,
            currentListId: '',
            currentListName: '',
            nextPageNumber: 1,
            updatedAt: '',
            baseElapsedMs: 0,
            savedRequestCount: 0,
            savedAttemptCount: 0
        };
        state.dataset = dataset;
        const targetInput = state.shadow?.getElementById(id('target-input'));
        if (targetInput && dataset.targetUser) {
            targetInput.value = dataset.targetUser;
        }
        renderSummary();
        renderPreview();
        renderUiState();
    }

    async function handleDeleteSelected() {
        if (!state.selectedKey) {
            notify('Chưa có dataset nào được chọn.', true);
            return;
        }
        const meta = state.metaList.find((item) => item.key === state.selectedKey);
        const label = meta ? `${meta.targetUser} <- ${meta.viewerUser || 'anonymous'}` : state.selectedKey;
        if (!window.confirm(`Xóa dataset "${label}" khỏi IndexedDB?`)) return;
        await deleteDataset(state.selectedKey);
        addLog(`Đã xóa dataset ${label}.`, 'warn');
        if (state.dataset && state.dataset.key === state.selectedKey) {
            state.dataset = null;
        }
        state.selectedKey = '';
        await refreshMetaList({ forcePreferred: true });
        if (state.selectedKey) {
            await loadSelectedDataset(state.selectedKey);
        } else {
            renderSummary();
            renderPreview();
            renderUiState();
        }
    }

    function ensureDatasetLoaded() {
        if (!state.dataset) {
            notify('Chưa nạp dataset. Hãy chọn hoặc quét thư viện trước.', true);
            return false;
        }
        return true;
    }

    function downloadBlob(filename, blob) {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
    }

    function buildFilePrefix(dataset) {
        const parts = [
            dataset.sourceKind === 'bookmarks' ? 'wikicv-bookmarks' : 'wikicv-library',
            dataset.host,
            dataset.targetUser,
            dataset.viewerUser || 'anonymous'
        ];
        return parts.join('-').replace(/[^\w.\-]+/g, '_');
    }

    function exportJson() {
        if (!ensureDatasetLoaded()) return;
        const text = JSON.stringify(state.dataset, null, 2);
        downloadBlob(`${buildFilePrefix(state.dataset)}.json`, new Blob([text], { type: 'application/json' }));
        addLog('Đã xuất JSON.', 'success');
    }

    function buildTxtExport(dataset) {
        const lines = [];
        lines.push(`Wikicv Library & Bookmarks Archiver v${VERSION}`);
        lines.push(`Nguon: ${sourceKindLabel(dataset.sourceKind || 'library')}`);
        lines.push(`Host: ${dataset.host}`);
        lines.push(`Viewer: ${dataset.viewerUser || 'anonymous'}${dataset.viewerDisplayName ? ` (${dataset.viewerDisplayName})` : ''}`);
        lines.push(`Target: ${dataset.targetUser}${dataset.targetDisplayName ? ` (${dataset.targetDisplayName})` : ''}`);
        lines.push(`Scanned: ${fmtDateTime(dataset.scannedAt)}`);
        lines.push(`Elapsed: ${fmtDuration(dataset.summary.elapsedMs)}`);
        lines.push(`Lists: ${fmtNum(dataset.summary.listCount)}`);
        lines.push(`Unique books: ${fmtNum(dataset.summary.uniqueBookCount)}`);
        lines.push(`List refs: ${fmtNum(dataset.summary.totalRefs)}`);
        lines.push(`Duplicates between lists: ${fmtNum(dataset.summary.duplicateRefs)}`);
        lines.push(`Views: ${fmtNum(dataset.summary.totalViews)} | Likes: ${fmtNum(dataset.summary.totalLikes)} | Comments: ${fmtNum(dataset.summary.totalComments)} | Thanks: ${fmtNum(dataset.summary.totalThanks)}`);
        lines.push('');
        lines.push('=== Danh Sach ===');
        dataset.lists.forEach((list, index) => {
            const visibility = list.isPublic === true ? 'public' : (list.isPublic === false ? 'private' : 'unknown');
            lines.push(`${index + 1}. ${list.name} | ${fmtNum(list.actualCount)} truyện | ${visibility} | ${fmtNum(list.pageCount)} trang`);
        });
        lines.push('');
        lines.push('=== Truyen ===');
        dataset.bookIds.forEach((bookId, index) => {
            const book = dataset.booksById[bookId];
            if (!book) return;
            lines.push(`${index + 1}. ${book.displayTitle}`);
            lines.push(`   ID: ${book.id}`);
            lines.push(`   Ten Viet: ${book.titleVi || book.titleCv || book.displayTitle || '—'}`);
            lines.push(`   Ten Trung: ${book.titleCn || '—'}`);
            lines.push(`   Tac gia Viet: ${book.authorVi || book.authorCv || book.displayAuthor || '—'}`);
            lines.push(`   Tac gia Trung: ${book.authorCn || '—'}`);
            if (book.titleCv && book.titleCv !== book.titleVi) lines.push(`   Ten CV: ${book.titleCv}`);
            if (book.authorCv && book.authorCv !== book.authorVi) lines.push(`   Tac gia CV: ${book.authorCv}`);
            lines.push(`   Trang thai: ${book.statusName || '—'} | Gioi tinh: ${book.genderName || '—'} | Private: ${book.isPrivate ? 'yes' : 'no'}`);
            lines.push(`   Stats: views ${fmtNum(book.stats.views)} | likes ${fmtNum(book.stats.likes)} | comments ${fmtNum(book.stats.comments)} | thanks ${fmtNum(book.stats.thanks)}`);
            lines.push(`   Danh sach: ${book.listNames.join(', ') || '—'}`);
            lines.push(`   URL: ${book.url || '—'}`);
            lines.push(`   Cover: ${book.coverUrl || '—'}`);
            lines.push(`   Search Wiki: ${book.searchWikiUrl || '—'}`);
            lines.push(`   Search Google: ${book.searchGoogleUrl || '—'}`);
            const bookmarkRefs = (book.appearances || []).filter((item) => item.bookmarkedChapterTitle || item.bookmarkedChapterUrl);
            bookmarkRefs.forEach((item) => {
                lines.push(`   Chuong bookmark [${item.listName}]: ${item.bookmarkedChapterTitle || '—'}`);
                lines.push(`   URL chuong bookmark: ${item.bookmarkedChapterUrl || '—'}`);
            });
            if (book.tagIds && book.tagIds.length) {
                lines.push(`   Tag IDs: ${book.tagIds.join(', ')}`);
            }
            lines.push('');
        });
        return lines.join('\n');
    }

    function exportTxt() {
        if (!ensureDatasetLoaded()) return;
        const text = buildTxtExport(state.dataset);
        downloadBlob(`${buildFilePrefix(state.dataset)}.txt`, new Blob([text], { type: 'text/plain;charset=utf-8' }));
        addLog('Đã xuất TXT.', 'success');
    }

    function htmlExportPayload(dataset, coverMap) {
        return {
            meta: {
                version: VERSION,
                sourceKind: dataset.sourceKind || 'library',
                host: dataset.host,
                viewerUser: dataset.viewerUser || 'anonymous',
                viewerDisplayName: dataset.viewerDisplayName || '',
                targetUser: dataset.targetUser,
                targetDisplayName: dataset.targetDisplayName || '',
                scannedAt: dataset.scannedAt,
                elapsedMs: dataset.summary.elapsedMs,
                listCount: dataset.summary.listCount,
                uniqueBookCount: dataset.summary.uniqueBookCount,
                totalRefs: dataset.summary.totalRefs,
                duplicateRefs: dataset.summary.duplicateRefs,
                totalViews: dataset.summary.totalViews,
                totalLikes: dataset.summary.totalLikes,
                totalComments: dataset.summary.totalComments,
                totalThanks: dataset.summary.totalThanks
            },
            lists: dataset.lists.map((list) => ({
                listId: list.listId,
                name: list.name,
                declaredCount: list.declaredCount,
                actualCount: list.actualCount,
                isPublic: list.isPublic,
                pageCount: list.pageCount
            })),
            books: dataset.bookIds.map((bookId) => {
                const book = dataset.booksById[bookId];
                return {
                    id: book.id,
                    title: book.displayTitle,
                    titleVi: book.titleVi,
                    titleCv: book.titleCv,
                    titleCn: book.titleCn,
                    author: book.displayAuthor,
                    authorVi: book.authorVi,
                    authorCv: book.authorCv,
                    authorCn: book.authorCn,
                    url: book.url,
                    authorUrl: book.authorUrl,
                    coverUrl: coverMap[book.id] || book.coverUrl || '',
                    status: book.statusName,
                    gender: book.genderName,
                    isPrivate: book.isPrivate,
                    stats: book.stats,
                    listIds: book.listIds,
                    listNames: book.listNames,
                    appearances: book.appearances || [],
                    searchWikiUrl: book.searchWikiUrl,
                    searchGoogleUrl: book.searchGoogleUrl
                };
            })
        };
    }

    async function fetchCoverAsDataUrl(url) {
        if (!url) return '';
        if (url.startsWith('data:')) return url;
        if (!url.startsWith(location.origin)) return url;
        const response = await fetchWithRetry(url, {
            label: `Cover ${url}`,
            timeoutMs: clamp(Math.floor(state.settings.timeoutMs * 0.75), 1000, 60000),
            retryCount: Math.max(1, Math.min(3, state.settings.retryCount)),
            retryDelayMs: 0,
            cache: 'default',
            headers: {
                accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8'
            }
        });
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ''));
            reader.onerror = () => reject(reader.error || new Error('FileReader error'));
            reader.readAsDataURL(blob);
        });
    }

    async function mapWithConcurrency(items, concurrency, worker) {
        const normalizedItems = Array.isArray(items) ? items : [];
        const size = clamp(Number(concurrency) || 1, 1, Math.max(normalizedItems.length || 1, 1));
        let cursor = 0;
        const runners = Array.from({ length: Math.min(size, normalizedItems.length || 1) }, async () => {
            while (true) {
                const index = cursor;
                cursor += 1;
                if (index >= normalizedItems.length) {
                    return;
                }
                await worker(normalizedItems[index], index);
            }
        });
        await Promise.all(runners);
    }

    async function buildEmbeddedCoverMap(booksWithCover) {
        const coverMap = {};
        const total = booksWithCover.length;
        if (!total) {
            return coverMap;
        }

        const concurrency = clamp(
            Math.min(MAX_EMBED_COVER_CONCURRENCY, Number(window.navigator.hardwareConcurrency) || MAX_EMBED_COVER_CONCURRENCY),
            2,
            MAX_EMBED_COVER_CONCURRENCY
        );
        addLog(`Nhúng ảnh bìa bằng ${fmtNum(Math.min(concurrency, total))} luồng tải song song.`, 'info');

        await mapWithConcurrency(booksWithCover, concurrency, async (book, index) => {
            const staggerMs = (index % concurrency) * EMBED_COVER_START_STAGGER_MS;
            if (staggerMs > 0) {
                await sleep(staggerMs);
            }
            setProgressStage(
                'Nhúng ảnh bìa vào HTML',
                book.displayTitle,
                `Đang tải ${fmtNum(state.progress.completed + 1)}/${fmtNum(total)} • ${fmtNum(Math.min(concurrency, total))} luồng • nghỉ ${EMBED_COVER_COOLDOWN_MS}ms giữa lượt`
            );
            try {
                coverMap[book.id] = await fetchCoverAsDataUrl(book.coverUrl);
            } catch (error) {
                coverMap[book.id] = book.coverUrl;
                addLog(`Không nhúng được bìa cho "${book.displayTitle}": ${error.message}`, 'warn');
            }
            completeProgressUnit(`Bìa ${index + 1}/${total}`);
            if (index + concurrency < total) {
                await sleep(EMBED_COVER_COOLDOWN_MS);
            }
        });

        return coverMap;
    }

    function buildHtmlDocument(payload) {
        const json = JSON.stringify(payload).replace(/</g, '\\u003c');
        return `<!doctype html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Thư viện ${escapeHtml(payload.meta.targetUser)}</title>
    <style>
        :root {
            --bg: #eef4fb;
            --panel: #ffffff;
            --panel-2: #f6faff;
            --ink: #102033;
            --muted: #5b728b;
            --line: rgba(16,32,51,0.12);
            --accent: #0ea5e9;
            --accent-2: #0f766e;
            --pill: #dff3ff;
            --shadow: 0 20px 50px rgba(7, 18, 30, 0.12);
        }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: "Segoe UI", Arial, sans-serif;
            color: var(--ink);
            background:
                radial-gradient(circle at top left, rgba(14,165,233,0.14), transparent 34%),
                radial-gradient(circle at top right, rgba(15,118,110,0.12), transparent 28%),
                linear-gradient(180deg, #f7fbff, var(--bg));
        }
        a { color: var(--accent); text-decoration: none; }
        .shell {
            width: min(1180px, calc(100vw - 32px));
            margin: 22px auto 40px;
            display: grid;
            gap: 16px;
        }
        .hero, .panel {
            background: var(--panel);
            border: 1px solid var(--line);
            border-radius: 18px;
            box-shadow: var(--shadow);
        }
        .hero {
            padding: 24px;
            display: grid;
            gap: 18px;
        }
        .hero-head {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            align-items: flex-start;
            flex-wrap: wrap;
        }
        .eyebrow {
            display: inline-flex;
            gap: 8px;
            align-items: center;
            padding: 6px 10px;
            border-radius: 999px;
            background: var(--pill);
            color: #0b4b75;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: .04em;
            text-transform: uppercase;
        }
        .hero h1 {
            margin: 10px 0 6px;
            font-size: clamp(28px, 4vw, 40px);
            line-height: 1.05;
        }
        .meta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            color: var(--muted);
            font-size: 14px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 12px;
        }
        .stat {
            padding: 14px 16px;
            border-radius: 14px;
            background: var(--panel-2);
            border: 1px solid rgba(14, 165, 233, 0.12);
        }
        .stat strong {
            display: block;
            font-size: 20px;
            margin-top: 4px;
        }
        .panel {
            padding: 18px;
        }
        .toolbar {
            display: grid;
            grid-template-columns: 1.4fr .8fr .8fr;
            gap: 10px;
        }
        .toolbar input, .toolbar select {
            width: 100%;
            padding: 12px 14px;
            border-radius: 12px;
            border: 1px solid var(--line);
            background: #fff;
            color: var(--ink);
            font-size: 14px;
        }
        .lists {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 14px;
        }
        .list-chip {
            padding: 10px 12px;
            border-radius: 14px;
            background: #f7fbff;
            border: 1px solid var(--line);
            font-size: 13px;
        }
        .results-meta {
            margin: 14px 0 2px;
            color: var(--muted);
            font-size: 13px;
        }
        .rows {
            display: grid;
            gap: 12px;
            margin-top: 14px;
        }
        .row {
            display: grid;
            grid-template-columns: 92px 1fr;
            gap: 14px;
            padding: 14px;
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 16px;
        }
        .cover {
            width: 92px;
            height: 128px;
            border-radius: 12px;
            overflow: hidden;
            background: linear-gradient(135deg, #18344c, #0d1a2b);
            border: 1px solid rgba(255,255,255,0.15);
        }
        .cover img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .title-line {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            align-items: center;
        }
        .title-line a {
            font-size: 18px;
            font-weight: 700;
            line-height: 1.2;
        }
        .badge {
            padding: 4px 8px;
            border-radius: 999px;
            font-size: 12px;
            background: #e8f6ff;
            color: #0a6b9b;
            border: 1px solid rgba(14,165,233,0.18);
        }
        .badge.private {
            background: #fff0f3;
            color: #b42345;
            border-color: rgba(180,35,69,0.18);
        }
        .subline, .line {
            margin-top: 6px;
            color: var(--muted);
            font-size: 13px;
            line-height: 1.5;
        }
        .chips {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 8px;
        }
        .chips span {
            padding: 5px 8px;
            border-radius: 999px;
            background: #f1f8ff;
            border: 1px solid rgba(16,32,51,0.08);
            font-size: 12px;
        }
        .empty {
            padding: 28px 12px;
            text-align: center;
            color: var(--muted);
            font-size: 14px;
        }
        @media (max-width: 820px) {
            .toolbar { grid-template-columns: 1fr; }
            .row { grid-template-columns: 1fr; }
            .cover { width: 100%; max-width: 160px; height: 220px; }
        }
    </style>
</head>
<body>
    <div class="shell">
        <section class="hero">
            <div class="hero-head">
                <div>
                    <div class="eyebrow">Library &amp; Bookmarks Archiver • ${escapeHtml(sourceKindLabel(payload.meta.sourceKind || 'library'))}</div>
                    <h1>${escapeHtml(payload.meta.targetDisplayName || payload.meta.targetUser)}</h1>
                    <div class="meta-row">
                        <span>Target: ${escapeHtml(payload.meta.targetUser)}</span>
                        <span>Viewer: ${escapeHtml(payload.meta.viewerUser || 'anonymous')}</span>
                        <span>Scanned: ${escapeHtml(new Date(payload.meta.scannedAt).toLocaleString('vi-VN'))}</span>
                        <span>Elapsed: ${escapeHtml(fmtDuration(payload.meta.elapsedMs))}</span>
                    </div>
                </div>
            </div>
            <div class="stats">
                <div class="stat">Danh sách<strong>${escapeHtml(fmtNum(payload.meta.listCount))}</strong></div>
                <div class="stat">Truyện unique<strong>${escapeHtml(fmtNum(payload.meta.uniqueBookCount))}</strong></div>
                <div class="stat">Lượt refs<strong>${escapeHtml(fmtNum(payload.meta.totalRefs))}</strong></div>
                <div class="stat">Views<strong>${escapeHtml(fmtNum(payload.meta.totalViews))}</strong></div>
                <div class="stat">Likes<strong>${escapeHtml(fmtNum(payload.meta.totalLikes))}</strong></div>
                <div class="stat">Comments<strong>${escapeHtml(fmtNum(payload.meta.totalComments))}</strong></div>
            </div>
        </section>

        <section class="panel">
            <div class="toolbar">
                <input id="search" placeholder="Tìm theo tên truyện, tác giả, danh sách..." />
                <select id="listFilter"></select>
                <select id="sortBy">
                    <option value="views">Views giảm dần</option>
                    <option value="likes">Like giảm dần</option>
                    <option value="comments">Comment giảm dần</option>
                    <option value="title">Tiêu đề A-Z</option>
                    <option value="lists">Số danh sách giảm dần</option>
                </select>
            </div>
            <div id="listChips" class="lists"></div>
            <div id="resultsMeta" class="results-meta"></div>
            <div id="rows" class="rows"></div>
        </section>
    </div>
    <script id="data" type="application/json">${json}</script>
    <script>
        const payload = JSON.parse(document.getElementById('data').textContent);
        const searchEl = document.getElementById('search');
        const listFilterEl = document.getElementById('listFilter');
        const sortByEl = document.getElementById('sortBy');
        const rowsEl = document.getElementById('rows');
        const resultsMetaEl = document.getElementById('resultsMeta');
        const listChipsEl = document.getElementById('listChips');

        const normalize = (value) => String(value || '')
            .normalize('NFD')
            .replace(/[\\u0300-\\u036f]/g, '')
            .toLowerCase()
            .trim();
        const fmtNum = (value) => new Intl.NumberFormat('vi-VN').format(Number(value) || 0);
        const placeholder = ${JSON.stringify(PLACEHOLDER_COVER)};

        function init() {
            listFilterEl.innerHTML = '<option value="all">Tất cả danh sách</option>' + payload.lists
                .map((item) => '<option value="' + item.listId + '">' + escapeHtml(item.name) + ' (' + fmtNum(item.actualCount) + ')</option>')
                .join('');
            listChipsEl.innerHTML = payload.lists
                .map((item) => '<div class="list-chip"><strong>' + escapeHtml(item.name) + '</strong><br>' + fmtNum(item.actualCount) + ' truyện</div>')
                .join('');

            searchEl.addEventListener('input', render);
            listFilterEl.addEventListener('change', render);
            sortByEl.addEventListener('change', render);
            render();
        }

        function render() {
            const needle = normalize(searchEl.value);
            const listId = listFilterEl.value;
            const sortBy = sortByEl.value;

            let books = payload.books.filter((book) => {
                if (listId !== 'all' && !book.listIds.includes(listId)) return false;
                if (!needle) return true;
                return normalize([
                    book.title,
                    book.titleVi,
                    book.titleCv,
                    book.titleCn,
                    book.author,
                    book.authorVi,
                    book.authorCv,
                    book.authorCn,
                    ...(book.listNames || [])
                ].join(' | ')).includes(needle);
            });

            books.sort((a, b) => {
                if (sortBy === 'title') return String(a.title || '').localeCompare(String(b.title || ''), 'vi');
                if (sortBy === 'likes') return (b.stats.likes || 0) - (a.stats.likes || 0);
                if (sortBy === 'comments') return (b.stats.comments || 0) - (a.stats.comments || 0);
                if (sortBy === 'lists') return (b.listIds.length || 0) - (a.listIds.length || 0);
                return (b.stats.views || 0) - (a.stats.views || 0);
            });

            resultsMetaEl.textContent = 'Hiển thị ' + fmtNum(books.length) + ' truyện.';
            if (!books.length) {
                rowsEl.innerHTML = '<div class="empty">Không có kết quả phù hợp.</div>';
                return;
            }

            rowsEl.innerHTML = books.map((book) => {
                const badges = [
                    book.status ? '<span class="badge">' + escapeHtml(book.status) + '</span>' : '',
                    book.gender ? '<span class="badge">' + escapeHtml(book.gender) + '</span>' : '',
                    book.isPrivate ? '<span class="badge private">Private</span>' : ''
                ].join('');
                const chips = (book.listNames || []).map((item) => '<span>' + escapeHtml(item) + '</span>').join('');
                const subtitle = [];
                if (book.titleCv && book.titleCv !== book.title) subtitle.push('CV: ' + escapeHtml(book.titleCv));
                if (book.titleCn) subtitle.push('Tên Trung: ' + escapeHtml(book.titleCn));
                const bookmarkChapters = (book.appearances || [])
                    .filter((item) => item.bookmarkedChapterTitle || item.bookmarkedChapterUrl)
                    .map((item) => '<a href="' + escapeHtml(item.bookmarkedChapterUrl || '#') + '" target="_blank" rel="noreferrer">' + escapeHtml((item.listName ? item.listName + ': ' : '') + (item.bookmarkedChapterTitle || 'Mở chương')) + '</a>')
                    .join(' | ');
                return '' +
                    '<article class="row">' +
                        '<div class="cover"><img src="' + escapeHtml(book.coverUrl || placeholder) + '" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src=\\'' + escapeHtml(placeholder) + '\\'"></div>' +
                        '<div>' +
                            '<div class="title-line">' +
                                '<a href="' + escapeHtml(book.url || '#') + '" target="_blank" rel="noreferrer">' + escapeHtml(book.title || book.id) + '</a>' +
                                badges +
                            '</div>' +
                            (subtitle.length ? '<div class="subline">' + subtitle.join(' | ') + '</div>' : '') +
                            '<div class="line">Tác giả Việt: ' + escapeHtml(book.authorVi || book.authorCv || book.author || 'Không rõ') + '</div>' +
                            (book.authorCn ? '<div class="line">Tác giả Trung: ' + escapeHtml(book.authorCn) + '</div>' : '') +
                            (bookmarkChapters ? '<div class="line">Chương bookmark: ' + bookmarkChapters + '</div>' : '') +
                            '<div class="line">Views ' + fmtNum(book.stats.views) + ' | Likes ' + fmtNum(book.stats.likes) + ' | Comments ' + fmtNum(book.stats.comments) + ' | Thanks ' + fmtNum(book.stats.thanks) + '</div>' +
                            '<div class="line"><a href="' + escapeHtml(book.searchWikiUrl || '#') + '" target="_blank" rel="noreferrer">Tìm Wiki</a> | <a href="' + escapeHtml(book.searchGoogleUrl || '#') + '" target="_blank" rel="noreferrer">Tìm Google</a></div>' +
                            '<div class="chips">' + chips + '</div>' +
                        '</div>' +
                    '</article>';
            }).join('');
        }

        function escapeHtml(value) {
            return String(value || '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        init();
    </script>
</body>
</html>`;
    }

    async function exportHtml() {
        if (!ensureDatasetLoaded()) return;
        if (state.exportBusy) {
            notify('Đang có một tác vụ xuất khác.', true);
            return;
        }

        state.exportBusy = true;
        focusProgressCard();
        renderUiState();
        const embedCovers = Boolean(state.settings.htmlEmbedCovers);

        try {
            let coverMap = {};
            if (embedCovers) {
                const booksWithCover = state.dataset.bookIds
                    .map((bookId) => state.dataset.booksById[bookId])
                    .filter((book) => book && book.coverUrl && book.coverUrl.startsWith(location.origin));

                initProgress('export', (booksWithCover.length || 0) + 1, 'Chuẩn bị HTML tự chứa ảnh bìa', { delayMs: 0 });
                if (booksWithCover.length) {
                    coverMap = await buildEmbeddedCoverMap(booksWithCover);
                } else {
                    setProgressStage('Chuẩn bị HTML tự chứa ảnh bìa', 'Không có bìa cùng host để nhúng');
                }
            } else {
                initProgress('export', 1, 'Chuẩn bị HTML nhanh', { delayMs: 0 });
                setProgressStage(
                    'Chuẩn bị HTML nhanh',
                    state.dataset.targetDisplayName || state.dataset.targetUser,
                    'Giữ URL ảnh gốc như web để trình duyệt tự tải song song.'
                );
            }

            setProgressStage(
                'Đóng gói file HTML',
                state.dataset.targetDisplayName || state.dataset.targetUser,
                embedCovers
                    ? 'Đang ghi file HTML với ảnh bìa đã xử lý.'
                    : 'Ảnh bìa sẽ được trình duyệt tải lại như giao diện web.'
            );
            const payload = htmlExportPayload(state.dataset, coverMap);
            const html = buildHtmlDocument(payload);
            completeProgressUnit('Đã đóng gói HTML');
            downloadBlob(`${buildFilePrefix(state.dataset)}.html`, new Blob([html], { type: 'text/html;charset=utf-8' }));
            setProgressStage('Hoàn tất', state.dataset.targetDisplayName || state.dataset.targetUser, embedCovers ? 'HTML tự chứa ảnh bìa đã sẵn sàng.' : 'HTML nhanh dùng ảnh gốc đã sẵn sàng.');
            addLog(`Đã xuất HTML${embedCovers ? ' tự chứa ảnh bìa' : ' nhanh dùng ảnh gốc'}.`, 'success');
        } catch (error) {
            console.error('[LibraryArchiver] exportHtml', error);
            notify('Xuất HTML thất bại.', true);
        } finally {
            state.exportBusy = false;
            renderUiState();
            renderProgress();
        }
    }

    function syncInputsFromState() {
        if (!state.shadow) return;
        const targetInput = state.shadow.getElementById(id('target-input'));
        if (targetInput && !targetInput.value) {
            targetInput.value = state.currentPageUser || '';
        }
        const timeoutInput = state.shadow.getElementById(id('timeout'));
        const delayInput = state.shadow.getElementById(id('delay'));
        const retryInput = state.shadow.getElementById(id('retry'));
        const retryDelayInput = state.shadow.getElementById(id('retry-delay'));
        const embedCheckbox = state.shadow.getElementById(id('embed-html'));
        if (timeoutInput) timeoutInput.value = String(state.settings.timeoutMs);
        if (delayInput) delayInput.value = String(state.settings.delayMs);
        if (retryInput) retryInput.value = String(state.settings.retryCount);
        if (retryDelayInput) retryDelayInput.value = String(state.settings.retryDelayMs);
        if (embedCheckbox) embedCheckbox.checked = Boolean(state.settings.htmlEmbedCovers);
    }

    function saveSettingsFromInputs() {
        if (!state.shadow) return;
        const timeoutValue = Number(state.shadow.getElementById(id('timeout'))?.value);
        const delayValue = Number(state.shadow.getElementById(id('delay'))?.value);
        const retryValue = Number(state.shadow.getElementById(id('retry'))?.value);
        const retryDelayValue = Number(state.shadow.getElementById(id('retry-delay'))?.value);
        state.settings.timeoutMs = clamp(Number.isFinite(timeoutValue) ? timeoutValue : DEFAULT_SETTINGS.timeoutMs, 1000, 180000);
        state.settings.delayMs = clamp(Number.isFinite(delayValue) ? delayValue : DEFAULT_SETTINGS.delayMs, 0, 60000);
        state.settings.retryCount = clamp(Number.isFinite(retryValue) ? retryValue : DEFAULT_SETTINGS.retryCount, 0, 10);
        state.settings.retryDelayMs = clamp(Number.isFinite(retryDelayValue) ? retryDelayValue : DEFAULT_SETTINGS.retryDelayMs, 0, 120000);
        state.settings.htmlEmbedCovers = Boolean(state.shadow.getElementById(id('embed-html'))?.checked);
        persistSettings();
        renderUiState();
    }

    function getTargetUserFromInput() {
        if (!state.shadow) return normalizeUserSlug(state.currentPageUser || '');
        const raw = state.shadow.getElementById(id('target-input'))?.value || state.currentPageUser || '';
        return normalizeUserSlug(raw);
    }

    function focusProgressCard() {
        if (!state.shadow) return;
        showPanel();
        const card = state.shadow.getElementById(id('progress-card'));
        if (!card) return;
        requestAnimationFrame(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    function renderScanNotice() {
        if (!state.shadow) return;
        const notice = state.shadow.getElementById(id('scan-notice'));
        if (!notice) return;
        const targetUser = getTargetUserFromInput();
        if (!targetUser) {
            notice.innerHTML = 'Nhập hoặc chọn user để quét.';
            return;
        }

        const resumeMeta = metaForTargetUser(targetUser, 'resume');
        const completeMeta = metaForTargetUser(targetUser, 'complete');

        if (resumeMeta) {
            notice.innerHTML = `
                Có checkpoint dở cho <strong>${escapeHtml(targetUser)}</strong>.
                Nhấn <strong>Tiếp tục</strong> để nối phiên quét lúc ${escapeHtml(fmtDateTime(resumeMeta.resumeUpdatedAt || resumeMeta.scannedAt))}.
            `;
            return;
        }

        if (completeMeta) {
            notice.innerHTML = `
                Đã có dataset full cho <strong>${escapeHtml(targetUser)}</strong> lúc ${escapeHtml(fmtDateTime(completeMeta.scannedAt))}.
                Nếu quét xong lần nữa, bản full cũ sẽ bị ghi đè.
            `;
            return;
        }

        notice.innerHTML = `Chưa có dataset nào cho <strong>${escapeHtml(targetUser)}</strong>.`;
    }

    function renderDatasetOptions() {
        if (!state.shadow) return;
        const select = state.shadow.getElementById(id('dataset-select'));
        if (!select) return;
        const previousValue = state.selectedKey || select.value || '';
        select.innerHTML = `
            <option value="">Chọn dataset đã lưu...</option>
            ${state.metaList.map((meta) => {
                const kind = meta.kind || (isResumeKey(meta.key) ? 'resume' : 'complete');
                const tag = kind === 'resume' ? '[Tiếp tục]' : '[Full]';
                const sourceTag = meta.sourceKind === 'bookmarks' ? '[BM]' : '[TV]';
                const label = `${tag}${sourceTag} ${meta.targetUser} <- ${meta.viewerUser || 'anonymous'} • ${fmtNum(meta.uniqueBookCount)} truyện • ${fmtDateTime(meta.scannedAt)}`;
                return `<option value="${escapeHtml(meta.key)}">${escapeHtml(label)}</option>`;
            }).join('')}
        `;
        select.value = state.metaList.some((item) => item.key === previousValue) ? previousValue : (state.selectedKey || '');
        state.selectedKey = select.value;
    }

    function renderProgress() {
        if (!state.shadow) return;
        const root = state.shadow.getElementById(id('progress-body'));
        if (!root) return;

        if (state.progress.mode === 'idle') {
            root.innerHTML = `<div class="empty">Chưa có tiến trình đang chạy.</div>`;
            return;
        }

        const percent = state.progress.total
            ? clamp(Math.round((state.progress.completed / state.progress.total) * 100), 0, 100)
            : 0;
        const elapsedMs = state.progress.startedAt ? Date.now() - state.progress.startedAt : 0;
        const etaMs = progressEtaMs();

        root.innerHTML = `
            <div class="progress-stage">${escapeHtml(state.progress.stage || 'Đang xử lý')}</div>
            <div class="progress-label">${escapeHtml(state.progress.currentLabel || '')}</div>
            <div class="progress-bar"><span style="width:${percent}%;"></span></div>
            <div class="progress-grid">
                <div><strong>${fmtNum(state.progress.completed)}</strong><span>Hoàn tất</span></div>
                <div><strong>${fmtNum(state.progress.total)}</strong><span>Tổng request</span></div>
                <div><strong>${fmtDuration(elapsedMs)}</strong><span>Đã chạy</span></div>
                <div><strong>${fmtDuration(etaMs)}</strong><span>ETA</span></div>
            </div>
            <div class="progress-extra">${escapeHtml(state.progress.extra || '')}</div>
        `;
    }

    function renderSummary() {
        if (!state.shadow) return;
        const container = state.shadow.getElementById(id('summary'));
        if (!container) return;

        const dataset = state.dataset;
        const meta = !dataset && state.selectedKey
            ? state.metaList.find((item) => item.key === state.selectedKey)
            : null;
        const source = dataset || meta;

        if (!source) {
            container.innerHTML = `<div class="empty">Chưa có dataset nào được nạp.</div>`;
            renderListFilter();
            return;
        }

        const viewerUser = dataset ? dataset.viewerUser : meta.viewerUser;
        const targetUser = dataset ? dataset.targetUser : meta.targetUser;
        const targetDisplayName = dataset ? dataset.targetDisplayName : meta.targetDisplayName;
        const scannedAt = dataset ? dataset.scannedAt : meta.scannedAt;
        const uniqueBookCount = dataset ? dataset.summary.uniqueBookCount : meta.uniqueBookCount;
        const listCount = dataset ? dataset.summary.listCount : meta.listCount;
        const totalRefs = dataset ? dataset.summary.totalRefs : meta.totalRefs;
        const totalViews = dataset ? dataset.summary.totalViews : meta.totalViews;
        const totalLikes = dataset ? dataset.summary.totalLikes : meta.totalLikes;
        const totalComments = dataset ? dataset.summary.totalComments : meta.totalComments;
        const sourceLabel = sourceKindLabel(dataset ? dataset.sourceKind : (meta.sourceKind || 'library'));
        const kind = dataset ? inferDatasetKind(dataset) : (meta.kind || (isResumeKey(meta.key) ? 'resume' : 'complete'));
        const checkpointText = kind === 'resume'
            ? ` • Checkpoint: ${escapeHtml(fmtDateTime(dataset?.resume?.updatedAt || meta.resumeUpdatedAt || scannedAt))}`
            : '';

        container.innerHTML = `
            <div class="summary-head">
                <div>
                    <div class="summary-title">${escapeHtml(targetDisplayName || targetUser || 'Dataset')}</div>
                    <div class="summary-meta">Nguồn: ${escapeHtml(sourceLabel)} • Viewer: ${escapeHtml(viewerUser || 'anonymous')} • Scan: ${escapeHtml(fmtDateTime(scannedAt))}${checkpointText}</div>
                </div>
                <div class="summary-chip">${kind === 'resume' ? 'TIẾP TỤC' : (dataset ? 'FULL' : 'META')}</div>
            </div>
            <div class="stat-grid">
                <div class="stat-card"><span>Danh sách</span><strong>${fmtNum(listCount)}</strong></div>
                <div class="stat-card"><span>Truyện unique</span><strong>${fmtNum(uniqueBookCount)}</strong></div>
                <div class="stat-card"><span>Lượt refs</span><strong>${fmtNum(totalRefs)}</strong></div>
                <div class="stat-card"><span>Views</span><strong>${fmtNum(totalViews)}</strong></div>
                <div class="stat-card"><span>Likes</span><strong>${fmtNum(totalLikes)}</strong></div>
                <div class="stat-card"><span>Comments</span><strong>${fmtNum(totalComments)}</strong></div>
            </div>
            ${kind === 'resume' ? `<div class="hint" style="margin-top:10px;">Đây là dataset tạm do quét dở. Nhấn <strong>Tiếp tục</strong> để hoàn thiện rồi mới ghi ra bản full.</div>` : ''}
        `;
        renderListFilter();
    }

    function previewBooks() {
        if (!state.dataset) return [];
        let list = state.dataset.bookIds.map((bookId) => state.dataset.booksById[bookId]).filter(Boolean);
        const search = stripDiacritics(state.preview.search);
        if (state.preview.listId !== 'all') {
            list = list.filter((book) => book.listIds.includes(state.preview.listId));
        }
        if (search) {
            list = list.filter((book) => book.searchText.includes(search));
        }
        list.sort((a, b) => {
            if (state.preview.sortBy === 'title') {
                return String(a.displayTitle || '').localeCompare(String(b.displayTitle || ''), 'vi');
            }
            if (state.preview.sortBy === 'likes') {
                return b.stats.likes - a.stats.likes;
            }
            if (state.preview.sortBy === 'comments') {
                return b.stats.comments - a.stats.comments;
            }
            if (state.preview.sortBy === 'lists') {
                return b.listIds.length - a.listIds.length;
            }
            return b.stats.views - a.stats.views;
        });
        return list;
    }

    function renderListFilter() {
        if (!state.shadow) return;
        const select = state.shadow.getElementById(id('list-filter'));
        if (!select) return;
        if (!state.dataset) {
            select.innerHTML = '<option value="all">Tất cả danh sách</option>';
            select.value = 'all';
            return;
        }
        const current = state.preview.listId;
        select.innerHTML = `
            <option value="all">Tất cả danh sách</option>
            ${state.dataset.lists.map((list) => {
                const label = `${list.name} (${fmtNum(list.actualCount)})`;
                return `<option value="${escapeHtml(list.listId)}">${escapeHtml(label)}</option>`;
            }).join('')}
        `;
        select.value = state.dataset.lists.some((list) => list.listId === current) ? current : 'all';
        state.preview.listId = select.value;
    }

    function renderPreview() {
        if (!state.shadow) return;
        const metaEl = state.shadow.getElementById(id('preview-meta'));
        const rowsEl = state.shadow.getElementById(id('preview-rows'));
        if (!metaEl || !rowsEl) return;

        if (!state.dataset) {
            metaEl.textContent = '';
            rowsEl.innerHTML = `<div class="empty">Nạp một dataset để xem trước dữ liệu.</div>`;
            return;
        }

        const books = previewBooks();
        const total = books.length;
        const visible = books.slice(0, PREVIEW_LIMIT);
        metaEl.textContent = total > PREVIEW_LIMIT
            ? `Hiển thị ${fmtNum(PREVIEW_LIMIT)}/${fmtNum(total)} truyện đầu tiên. Hãy lọc để thu hẹp kết quả.`
            : `Hiển thị ${fmtNum(total)} truyện.`;

        if (!visible.length) {
            rowsEl.innerHTML = `<div class="empty">Không có truyện phù hợp với bộ lọc hiện tại.</div>`;
            return;
        }

        rowsEl.innerHTML = visible.map((book) => {
            const badges = [
                book.statusName ? `<span class="badge">${escapeHtml(book.statusName)}</span>` : '',
                book.genderName ? `<span class="badge">${escapeHtml(book.genderName)}</span>` : '',
                book.isPrivate ? `<span class="badge badge-danger">Private</span>` : ''
            ].join('');
            const subtitles = [];
            if (book.titleCv && book.titleCv !== book.displayTitle) subtitles.push(`CV: ${escapeHtml(book.titleCv)}`);
            if (book.titleCn) subtitles.push(`Tên Trung: ${escapeHtml(book.titleCn)}`);
            const bookmarkRefs = (book.appearances || []).filter((item) => item.bookmarkedChapterTitle || item.bookmarkedChapterUrl);
            const cover = escapeHtml(book.coverUrl || PLACEHOLDER_COVER);
            return `
                <article class="book-row">
                    <div class="book-cover"><img src="${cover}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.src='${escapeHtml(PLACEHOLDER_COVER)}'"></div>
                    <div class="book-content">
                        <div class="book-title-line">
                            <a href="${escapeHtml(book.url || '#')}" target="_blank" rel="noreferrer">${escapeHtml(book.displayTitle)}</a>
                            ${badges}
                        </div>
                        ${subtitles.length ? `<div class="book-subtitle">${subtitles.join(' | ')}</div>` : ''}
                        <div class="book-meta">Tác giả Việt: ${escapeHtml(book.authorVi || book.authorCv || book.displayAuthor)}</div>
                        ${book.authorCn ? `<div class="book-meta">Tác giả Trung: ${escapeHtml(book.authorCn)}</div>` : ''}
                        ${bookmarkRefs.length ? `<div class="book-meta">Chương bookmark: ${bookmarkRefs.map((item) => item.bookmarkedChapterUrl
                            ? `<a href="${escapeHtml(item.bookmarkedChapterUrl)}" target="_blank" rel="noreferrer">${escapeHtml(`${item.listName}: ${item.bookmarkedChapterTitle || 'Mở chương'}`)}</a>`
                            : escapeHtml(`${item.listName}: ${item.bookmarkedChapterTitle}`)).join(' | ')}</div>` : ''}
                        <div class="book-meta">Views ${fmtNum(book.stats.views)} • Likes ${fmtNum(book.stats.likes)} • Comments ${fmtNum(book.stats.comments)} • Thanks ${fmtNum(book.stats.thanks)}</div>
                        <div class="book-meta">Chủ truyện: ${escapeHtml(book.ownerName || '—')}</div>
                        <div class="chip-row">${book.listNames.map((name) => `<span>${escapeHtml(name)}</span>`).join('')}</div>
                        <div class="book-links">
                            ${book.authorUrl ? `<a href="${escapeHtml(book.authorUrl)}" target="_blank" rel="noreferrer">Tác giả</a>` : ''}
                            ${book.searchWikiUrl ? `<a href="${escapeHtml(book.searchWikiUrl)}" target="_blank" rel="noreferrer">Tìm Wiki</a>` : ''}
                            ${book.searchGoogleUrl ? `<a href="${escapeHtml(book.searchGoogleUrl)}" target="_blank" rel="noreferrer">Google</a>` : ''}
                        </div>
                    </div>
                </article>
            `;
        }).join('');
    }

    function renderLogs() {
        if (!state.shadow) return;
        const container = state.shadow.getElementById(id('log-box'));
        if (!container) return;
        if (!state.logs.length) {
            container.innerHTML = `<div class="empty">Chưa có log.</div>`;
            return;
        }
        container.innerHTML = state.logs.map((entry) => {
            return `
                <div class="log-item log-${escapeHtml(entry.level)}">
                    <span class="log-time">${escapeHtml(new Date(entry.time).toLocaleTimeString('vi-VN'))}</span>
                    <span>${escapeHtml(entry.message)}</span>
                </div>
            `;
        }).join('');
    }

    function renderUiState() {
        if (!state.shadow) return;
        const scanBtn = state.shadow.getElementById(id('scan-btn'));
        const stopBtn = state.shadow.getElementById(id('stop-btn'));
        const loadBtn = state.shadow.getElementById(id('load-btn'));
        const deleteBtn = state.shadow.getElementById(id('delete-btn'));
        const exportJsonBtn = state.shadow.getElementById(id('export-json'));
        const exportTxtBtn = state.shadow.getElementById(id('export-txt'));
        const exportHtmlBtn = state.shadow.getElementById(id('export-html'));
        const datasetSelect = state.shadow.getElementById(id('dataset-select'));
        const targetUser = getTargetUserFromInput();
        const resumeMeta = metaForTargetUser(targetUser, 'resume');

        if (scanBtn) scanBtn.disabled = state.scanning || state.exportBusy;
        if (stopBtn) stopBtn.disabled = !state.scanning;
        if (loadBtn) loadBtn.disabled = state.scanning || state.exportBusy || !state.selectedKey;
        if (deleteBtn) deleteBtn.disabled = state.scanning || state.exportBusy || !state.selectedKey;
        if (exportJsonBtn) exportJsonBtn.disabled = state.scanning || state.exportBusy || !state.dataset;
        if (exportTxtBtn) exportTxtBtn.disabled = state.scanning || state.exportBusy || !state.dataset;
        if (exportHtmlBtn) exportHtmlBtn.disabled = state.scanning || state.exportBusy || !state.dataset;
        if (datasetSelect) datasetSelect.disabled = state.scanning || state.exportBusy;
        if (scanBtn) {
            scanBtn.textContent = state.scanning ? 'Đang quét...' : (resumeMeta ? 'Tiếp tục' : 'Quét ngay');
        }
        renderScanNotice();
    }

    // Bảng nằm trong tab "lib" của bảng chung: mở / thu là việc của bảng chung.
    function showPanel() {
        if (!state.shadow) return;
        hubShow('lib');
        state.panelOpen = true;
        renderGuide();
    }

    function hidePanel() {
        if (!state.shadow) return;
        if (hubActive() === 'lib') hubHide();
        state.panelOpen = false;
        renderGuide();
    }

    function enableDrag(element, handle, storageKey) {
        if (!element || !handle) return;
        const saved = safeGetValue(storageKey, null);
        if (saved?.left && saved?.top) {
            element.style.left = saved.left;
            element.style.top = saved.top;
            element.style.right = 'auto';
            element.style.bottom = 'auto';
        }

        let startX = 0;
        let startY = 0;
        let startRect = null;
        let suppressNextClick = false;
        const dragThreshold = 6;

        handle.addEventListener('click', (event) => {
            if (!suppressNextClick) return;
            suppressNextClick = false;
            event.preventDefault();
            event.stopPropagation();
        }, true);

        handle.addEventListener('pointerdown', (event) => {
            if (event.button !== 0) return;
            const origin = event.target instanceof Element ? event.target : null;
            if (origin && origin.closest('button, input, select, textarea, a, label, summary')) {
                return;
            }
            event.preventDefault();
            startRect = element.getBoundingClientRect();
            startX = event.clientX;
            startY = event.clientY;
            let dragged = false;
            element.style.left = `${startRect.left}px`;
            element.style.top = `${startRect.top}px`;
            element.style.right = 'auto';
            element.style.bottom = 'auto';

            const onMove = (moveEvent) => {
                const dx = moveEvent.clientX - startX;
                const dy = moveEvent.clientY - startY;
                if (!dragged && Math.hypot(dx, dy) < dragThreshold) {
                    return;
                }
                dragged = true;
                const left = clamp(startRect.left + dx, 0, window.innerWidth - startRect.width);
                const top = clamp(startRect.top + dy, 0, window.innerHeight - startRect.height);
                element.style.left = `${left}px`;
                element.style.top = `${top}px`;
            };
            const onUp = () => {
                window.removeEventListener('pointermove', onMove);
                window.removeEventListener('pointerup', onUp);
                if (dragged) {
                    suppressNextClick = true;
                    safeSetValue(storageKey, {
                        left: element.style.left,
                        top: element.style.top
                    });
                }
            };
            window.addEventListener('pointermove', onMove);
            window.addEventListener('pointerup', onUp);
        });
    }


    // Lớp phủ lên CSS gốc: vỏ bảng của bảng chung, màu theo bộ wikicv (biến --k-* của ui-kit).
    // Bố cục bên trong (lưới, thẻ truyện, hướng dẫn) giữ của bản gốc, chỉ đổi màu và cỡ.
    const LIB_SKIN = KIT_TOKENS + `
        .floating, .header { display: none !important; }
        .panel { position: static !important; width: auto !important; max-width: none !important; max-height: none !important;
            inset: auto !important; border: 0 !important; border-radius: 0 !important; box-shadow: none !important;
            background: transparent !important; overflow: visible !important; color: var(--k-text) !important;
            font-family: "Be Vietnam Pro","Segoe UI",Roboto,Arial,sans-serif !important; font-size: 12px !important; }
        .body { padding: 10px !important; max-height: none !important; overflow: visible !important; background: transparent !important;
            display: block !important; }
        .card { background: var(--k-card) !important; border: 1px solid var(--k-line) !important; border-radius: 10px !important;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.04) !important; padding: 10px !important; margin: 0 0 9px !important; color: var(--k-text) !important; }
        .card h3, .card summary { color: var(--k-text) !important; font-size: 12.5px !important; font-weight: 800 !important; margin: 0 !important; }
        .grid-2, .grid-3, .toolbar-row, .progress-grid, .stat-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
        .field label, .preview-meta, .progress-label, .progress-extra, .summary-meta, .book-subtitle, .book-meta { color: var(--k-muted) !important; font-size: 11px !important; }
        .field input, .field select, input, select { background: var(--k-field) !important; color: var(--k-text) !important;
            border: 1px solid var(--k-line) !important; border-radius: 7px !important; font-size: 12px !important; padding: 7px 9px !important; }
        .field input:focus, .field select:focus { outline: none !important; border-color: var(--k-accent) !important; }
        .row-actions { display: grid !important; grid-template-columns: repeat(2, minmax(0,1fr)) !important; gap: 8px !important; margin-top: 8px !important; }
        .row-actions > :only-child, .row-actions > :first-child:nth-last-child(3) { grid-column: 1 / -1; }
        .row-actions.tri { grid-template-columns: repeat(3, minmax(0,1fr)) !important; }
        .row-actions.tri > * { grid-column: auto !important; }
        .btn, .btn-alt, .btn-danger, .icon-btn { border: 0 !important; border-radius: 7px !important; font-size: 12px !important; font-weight: 700 !important;
            padding: 8px 10px !important; min-height: 0 !important; box-shadow: inset 0 1px 0 rgba(255,255,255,.22) !important; }
        .btn { background: var(--k-teal) !important; color: var(--k-on) !important; }
        .btn-alt, .icon-btn { background: var(--k-soft) !important; color: var(--k-softx) !important; box-shadow: none !important; }
        .btn-danger { background: var(--k-red) !important; color: var(--k-on) !important; }
        .hint, .empty { color: var(--k-muted) !important; font-size: 10.5px !important; }
        .empty { background: var(--k-field) !important; border: 1px solid var(--k-line) !important; border-radius: 8px !important; padding: 8px 10px !important; }
        code { background: var(--k-field) !important; color: var(--k-text) !important; }
        .checkbox { color: var(--k-text) !important; font-size: 11.5px !important; }
        .checkbox input { accent-color: var(--k-accent) !important; }
        .progress-stage, .summary-title { color: var(--k-text) !important; }
        .progress-bar { background: var(--k-soft) !important; height: 5px !important; }
        .progress-bar span { background: var(--k-teal) !important; }
        .progress-grid div, .stat-card { background: var(--k-field) !important; border: 1px solid var(--k-line) !important; border-radius: 8px !important; }
        .progress-grid strong, .stat-card strong { color: var(--k-text) !important; }
        .progress-grid span, .stat-card span { color: var(--k-muted) !important; }
        .summary-chip, .badge, .chip-row span { background: var(--k-soft) !important; color: var(--k-softx) !important; }
        .badge-danger { background: var(--k-red) !important; color: var(--k-on) !important; }
        .preview-rows, .log-box { background: var(--k-field) !important; border: 1px solid var(--k-line) !important; border-radius: 8px !important; max-height: 420px !important; }
        .book-row { grid-template-columns: 54px minmax(0,1fr) !important; gap: 9px !important; border-color: var(--k-line) !important; background: transparent !important; }
        .book-cover { width: 54px !important; height: 76px !important; border-radius: 6px !important; }
        .book-title-line a, .book-links a, .book-meta a { color: var(--k-link) !important; }
        .log-item { border-color: var(--k-line) !important; color: var(--k-text) !important; }
        .log-time { color: var(--k-muted) !important; }
        .log-error { color: var(--k-err) !important; } .log-success { color: var(--k-ok) !important; }
        .guide-card { background: var(--k-win) !important; color: var(--k-text) !important; border: 1px solid var(--k-edge) !important; }
        .guide-head, .guide-actions { background: transparent !important; border-color: var(--k-line) !important; }
        .guide-title, .guide-section h3 { color: var(--k-text) !important; }
        .guide-body { color: var(--k-text) !important; }
        .guide-kicker { color: var(--k-accent) !important; }
        .guide-badge, .guide-note { background: var(--k-field) !important; color: var(--k-text) !important; border-color: var(--k-line) !important; }
        .body::-webkit-scrollbar-thumb, .preview-rows::-webkit-scrollbar-thumb, .log-box::-webkit-scrollbar-thumb, .guide-body::-webkit-scrollbar-thumb { background: var(--k-edge) !important; }
    `;

    function createUi() {
        if (state.shadow) return;

        const host = document.createElement('div');
        host.id = id('host');
        const shadow = host.attachShadow({ mode: 'open' });
        state.ui = host;
        state.shadow = shadow;

        shadow.innerHTML = `
            <style>
                :host { all: initial; }
                * { box-sizing: border-box; }
                .body, .preview-rows, .log-box {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(15,110,160,0.55) rgba(16,32,51,0.08);
                }
                .body::-webkit-scrollbar, .preview-rows::-webkit-scrollbar, .log-box::-webkit-scrollbar {
                    width: 10px;
                    height: 10px;
                }
                .body::-webkit-scrollbar-track, .preview-rows::-webkit-scrollbar-track, .log-box::-webkit-scrollbar-track {
                    background: rgba(16,32,51,0.06);
                    border-radius: 999px;
                }
                .body::-webkit-scrollbar-thumb, .preview-rows::-webkit-scrollbar-thumb, .log-box::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, rgba(14,165,233,0.85), rgba(15,118,110,0.82));
                    border-radius: 999px;
                    border: 2px solid transparent;
                    background-clip: padding-box;
                }
                .body::-webkit-scrollbar-thumb:hover, .preview-rows::-webkit-scrollbar-thumb:hover, .log-box::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, rgba(3,105,161,0.95), rgba(13,148,136,0.92));
                }
                .hidden { display: none !important; }
                .floating {
                    position: fixed;
                    right: 18px;
                    bottom: 18px;
                    width: 58px;
                    height: 58px;
                    border-radius: 18px;
                    background: linear-gradient(135deg, #0ea5e9, #0f766e);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 999999;
                    font: 700 13px/1 "Segoe UI", Arial, sans-serif;
                    box-shadow: 0 18px 36px rgba(6,20,34,0.28);
                    user-select: none;
                }
                .panel {
                    position: fixed;
                    right: 20px;
                    bottom: 20px;
                    width: min(460px, calc(100vw - 24px));
                    max-height: min(88vh, 940px);
                    display: flex;
                    flex-direction: column;
                    background:
                        radial-gradient(circle at top right, rgba(74, 222, 128, 0.10), transparent 32%),
                        radial-gradient(circle at top left, rgba(56, 189, 248, 0.14), transparent 36%),
                        linear-gradient(180deg, #f8fcff, #eef5fb);
                    border: 1px solid rgba(18,42,61,0.10);
                    border-radius: 22px;
                    box-shadow: 0 24px 60px rgba(10, 24, 38, 0.18);
                    overflow: hidden;
                    z-index: 999999;
                    color: #102033;
                    font-family: "Segoe UI", Arial, sans-serif;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                    padding: 16px 18px;
                    background: rgba(255,255,255,0.88);
                    border-bottom: 1px solid rgba(16,32,51,0.10);
                    cursor: move;
                    backdrop-filter: blur(10px);
                }
                .header-title strong {
                    display: block;
                    font-size: 15px;
                    line-height: 1.2;
                }
                .header-title span {
                    display: block;
                    margin-top: 3px;
                    color: #627d98;
                    font-size: 11px;
                }
                .header-actions {
                    display: flex;
                    gap: 8px;
                }
                .icon-btn, .btn, .btn-alt, .btn-danger {
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    font-family: inherit;
                    transition: transform .15s ease, opacity .15s ease, background-color .15s ease;
                }
                .icon-btn {
                    min-width: 36px;
                    height: 36px;
                    background: rgba(16,32,51,0.08);
                    color: #102033;
                    font-size: 16px;
                }
                .icon-btn:hover, .btn:hover, .btn-alt:hover, .btn-danger:hover {
                    transform: translateY(-1px);
                }
                .icon-btn:disabled, .btn:disabled, .btn-alt:disabled, .btn-danger:disabled {
                    opacity: .55;
                    cursor: not-allowed;
                    transform: none;
                }
                .body {
                    padding: 14px;
                    overflow: auto;
                    display: grid;
                    gap: 12px;
                }
                .card {
                    background: rgba(255,255,255,0.84);
                    border: 1px solid rgba(16,32,51,0.08);
                    border-radius: 18px;
                    padding: 14px;
                    box-shadow: 0 14px 28px rgba(13,24,35,0.06);
                }
                .card h3, .card summary {
                    margin: 0;
                    font-size: 13px;
                    font-weight: 700;
                    color: #12283d;
                }
                details.card summary {
                    cursor: pointer;
                    list-style: none;
                }
                details.card summary::-webkit-details-marker { display: none; }
                .grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                }
                .grid-3 {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                }
                .field {
                    display: grid;
                    gap: 5px;
                }
                .field label {
                    font-size: 11px;
                    color: #597089;
                    font-weight: 600;
                    letter-spacing: .02em;
                }
                .field input, .field select {
                    width: 100%;
                    border: 1px solid rgba(16,32,51,0.12);
                    border-radius: 12px;
                    padding: 10px 12px;
                    background: #fff;
                    color: #102033;
                    font-size: 13px;
                    font-family: inherit;
                }
                .row-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 10px;
                }
                .btn, .btn-alt, .btn-danger {
                    padding: 9px 12px;
                    font-size: 12px;
                    font-weight: 700;
                }
                .btn {
                    background: linear-gradient(135deg, #0ea5e9, #0f766e);
                    color: #fff;
                }
                .btn-alt {
                    background: rgba(16,32,51,0.08);
                    color: #102033;
                }
                .btn-danger {
                    background: rgba(220,38,38,0.12);
                    color: #991b1b;
                }
                .hint {
                    font-size: 11px;
                    color: #68809a;
                    line-height: 1.45;
                }
                .progress-stage {
                    font-size: 13px;
                    font-weight: 700;
                    color: #12314a;
                }
                .progress-label, .progress-extra {
                    font-size: 12px;
                    color: #597089;
                    margin-top: 4px;
                }
                .progress-bar {
                    height: 8px;
                    margin-top: 10px;
                    border-radius: 999px;
                    overflow: hidden;
                    background: rgba(16,32,51,0.08);
                }
                .progress-bar span {
                    display: block;
                    height: 100%;
                    background: linear-gradient(90deg, #0ea5e9, #22c55e);
                    transition: width .2s ease;
                }
                .progress-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 8px;
                    margin-top: 10px;
                }
                .progress-grid div {
                    padding: 10px;
                    border-radius: 14px;
                    background: #f5fbff;
                    border: 1px solid rgba(16,32,51,0.06);
                    text-align: center;
                }
                .progress-grid strong {
                    display: block;
                    font-size: 15px;
                    color: #102033;
                }
                .progress-grid span {
                    display: block;
                    margin-top: 4px;
                    font-size: 11px;
                    color: #5d738d;
                }
                .summary-head {
                    display: flex;
                    justify-content: space-between;
                    gap: 8px;
                    align-items: flex-start;
                }
                .summary-title {
                    font-size: 15px;
                    font-weight: 700;
                }
                .summary-meta {
                    margin-top: 4px;
                    font-size: 11px;
                    color: #5d738d;
                }
                .summary-chip {
                    padding: 6px 10px;
                    border-radius: 999px;
                    background: #dff3ff;
                    color: #0b6796;
                    font-size: 11px;
                    font-weight: 700;
                }
                .stat-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 8px;
                    margin-top: 12px;
                }
                .stat-card {
                    padding: 10px;
                    border-radius: 14px;
                    background: #f5fbff;
                    border: 1px solid rgba(16,32,51,0.06);
                }
                .stat-card span {
                    display: block;
                    color: #5d738d;
                    font-size: 11px;
                }
                .stat-card strong {
                    display: block;
                    margin-top: 4px;
                    font-size: 17px;
                    color: #102033;
                }
                .toolbar {
                    display: grid;
                    gap: 10px;
                }
                .toolbar-row {
                    display: grid;
                    grid-template-columns: 1.2fr .8fr;
                    gap: 10px;
                }
                .preview-meta {
                    font-size: 12px;
                    color: #5d738d;
                    margin-bottom: 8px;
                }
                .preview-rows {
                    display: grid;
                    gap: 10px;
                    max-height: 420px;
                    overflow: auto;
                    padding-right: 2px;
                }
                .book-row {
                    display: grid;
                    grid-template-columns: 84px 1fr;
                    gap: 12px;
                    padding: 12px;
                    border-radius: 16px;
                    background: #fff;
                    border: 1px solid rgba(16,32,51,0.08);
                }
                .book-cover {
                    width: 84px;
                    height: 118px;
                    border-radius: 12px;
                    overflow: hidden;
                    background: linear-gradient(135deg, #18344c, #0d1a2b);
                }
                .book-cover img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
                .book-title-line {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    align-items: center;
                }
                .book-title-line a {
                    color: #0f6ea0;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 700;
                    line-height: 1.25;
                }
                .book-subtitle, .book-meta {
                    margin-top: 4px;
                    color: #5d738d;
                    font-size: 12px;
                    line-height: 1.45;
                }
                .badge {
                    display: inline-flex;
                    padding: 4px 8px;
                    border-radius: 999px;
                    background: #e8f6ff;
                    color: #0b6796;
                    font-size: 11px;
                    font-weight: 700;
                }
                .badge-danger {
                    background: #fff0f3;
                    color: #b42345;
                }
                .chip-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    margin-top: 8px;
                }
                .chip-row span {
                    padding: 4px 8px;
                    border-radius: 999px;
                    background: #f5fbff;
                    border: 1px solid rgba(16,32,51,0.08);
                    font-size: 11px;
                    color: #35516e;
                }
                .book-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 8px;
                }
                .book-links a {
                    color: #0f6ea0;
                    text-decoration: none;
                    font-size: 11px;
                    font-weight: 700;
                }
                .log-box {
                    max-height: 220px;
                    overflow: auto;
                    display: grid;
                    gap: 8px;
                    margin-top: 10px;
                }
                .log-item {
                    display: grid;
                    grid-template-columns: 74px 1fr;
                    gap: 8px;
                    font-size: 12px;
                    line-height: 1.4;
                    padding: 8px 10px;
                    border-radius: 12px;
                    background: #f8fbff;
                    border: 1px solid rgba(16,32,51,0.06);
                }
                .log-time {
                    color: #6d849c;
                    font-weight: 700;
                }
                .log-error { background: #fff3f5; color: #8f1d3a; }
                .log-warn { background: #fff8ef; color: #8a4b00; }
                .log-success { background: #effcf5; color: #17643a; }
                .empty {
                    padding: 14px 8px;
                    text-align: center;
                    color: #6d849c;
                    font-size: 12px;
                }
                .checkbox {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    margin-top: 10px;
                    font-size: 12px;
                    color: #365069;
                }
                .guide {
                    position: fixed;
                    inset: 0;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000001;
                }
                .guide.is-open {
                    display: flex;
                }
                .guide-backdrop {
                    position: absolute;
                    inset: 0;
                    background: rgba(7, 18, 30, 0.42);
                    backdrop-filter: blur(6px);
                }
                .guide-card {
                    position: relative;
                    width: min(560px, calc(100vw - 24px));
                    max-height: min(78vh, 760px);
                    display: grid;
                    grid-template-rows: auto 1fr auto;
                    background:
                        radial-gradient(circle at top right, rgba(74, 222, 128, 0.10), transparent 34%),
                        radial-gradient(circle at top left, rgba(56, 189, 248, 0.14), transparent 38%),
                        linear-gradient(180deg, #fbfeff, #eef5fb);
                    border: 1px solid rgba(16,32,51,0.10);
                    border-radius: 24px;
                    box-shadow: 0 28px 80px rgba(7, 18, 30, 0.28);
                    overflow: hidden;
                    color: #102033;
                    font-family: "Segoe UI", Arial, sans-serif;
                }
                .guide-head {
                    padding: 18px 20px 14px;
                    background: rgba(255,255,255,0.72);
                    border-bottom: 1px solid rgba(16,32,51,0.08);
                }
                .guide-kicker {
                    color: #0f6ea0;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: .08em;
                    text-transform: uppercase;
                }
                .guide-title {
                    margin: 8px 0 0;
                    font-size: 22px;
                    line-height: 1.15;
                }
                .guide-meta {
                    margin-top: 10px;
                }
                .guide-badge {
                    display: inline-flex;
                    padding: 6px 10px;
                    border-radius: 999px;
                    background: #dff3ff;
                    color: #0b6796;
                    font-size: 11px;
                    font-weight: 700;
                }
                .guide-body {
                    overflow: auto;
                    padding: 18px 20px;
                    font-size: 13px;
                    line-height: 1.6;
                    color: #35516e;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(15,110,160,0.55) rgba(16,32,51,0.08);
                }
                .guide-body::-webkit-scrollbar {
                    width: 10px;
                }
                .guide-body::-webkit-scrollbar-track {
                    background: rgba(16,32,51,0.06);
                    border-radius: 999px;
                }
                .guide-body::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, rgba(14,165,233,0.85), rgba(15,118,110,0.82));
                    border-radius: 999px;
                    border: 2px solid transparent;
                    background-clip: padding-box;
                }
                .guide-body::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, rgba(3,105,161,0.95), rgba(13,148,136,0.92));
                }
                .guide-section + .guide-section {
                    margin-top: 16px;
                }
                .guide-section h3 {
                    margin: 0 0 8px;
                    color: #102033;
                    font-size: 14px;
                }
                .guide-section p {
                    margin: 0;
                }
                .guide-list {
                    margin: 0;
                    padding-left: 18px;
                }
                .guide-list li + li {
                    margin-top: 6px;
                }
                .guide-note {
                    margin-top: 16px;
                    padding: 12px 14px;
                    border-radius: 14px;
                    background: rgba(223,243,255,0.88);
                    border: 1px solid rgba(14,165,233,0.14);
                    color: #24445f;
                }
                .guide-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 8px;
                    padding: 14px 20px 18px;
                    background: rgba(255,255,255,0.72);
                    border-top: 1px solid rgba(16,32,51,0.08);
                }
                @media (max-width: 560px) {
                    .panel {
                        width: calc(100vw - 12px);
                        right: 6px;
                        bottom: 6px;
                        max-height: calc(100vh - 12px);
                    }
                    .grid-2, .grid-3, .toolbar-row, .progress-grid, .stat-grid {
                        grid-template-columns: 1fr;
                    }
                    .book-row {
                        grid-template-columns: 1fr;
                    }
                    .book-cover {
                        width: 140px;
                        height: 196px;
                    }
                    .guide {
                        align-items: flex-end;
                    }
                    .guide-card {
                        width: calc(100vw - 12px);
                        max-height: calc(100vh - 12px);
                        border-radius: 24px 24px 18px 18px;
                    }
                    .guide-actions {
                        flex-direction: column;
                    }
                }
            </style>

            <div id="${id('floating')}" class="floating">${state.sourceKind === 'bookmarks' ? 'BM' : 'LIB'}</div>

            <div id="${id('panel')}" class="panel">
                <div id="${id('header')}" class="header">
                    <div class="header-title">
                        <strong>Library & Bookmarks Archiver</strong>
                        <span>${escapeHtml(sourceKindLabel(state.sourceKind))} • Wikicv / Koanchay • v${VERSION}</span>
                    </div>
                    <div class="header-actions">
                        <button id="${id('help')}" class="icon-btn" title="Hướng dẫn">?</button>
                        <button id="${id('refresh-meta')}" class="icon-btn" title="Làm mới">↻</button>
                        <button id="${id('minimize')}" class="icon-btn" title="Thu nhỏ">✕</button>
                    </div>
                </div>

                <div class="body">
                    <section class="card">
                        <h3>Quét ${escapeHtml(sourceKindLabel(state.sourceKind))}</h3>
                        <div class="grid-2" style="margin-top:10px;">
                            <div class="field">
                                <label>User cần quét</label>
                                <input id="${id('target-input')}" placeholder="vd: nguyễn-bảo233">
                            </div>
                            <div class="field">
                                <label>Dataset đã lưu</label>
                                <select id="${id('dataset-select')}"></select>
                            </div>
                        </div>
                        <div class="row-actions">
                            <button id="${id('use-page-user')}" class="btn-alt">Dùng user trang hiện tại</button>
                            <button id="${id('scan-btn')}" class="btn">Quét ngay</button>
                            <button id="${id('stop-btn')}" class="btn-danger">Dừng</button>
                        </div>
                        <div class="row-actions">
                            <button id="${id('load-btn')}" class="btn-alt">Nạp dataset</button>
                            <button id="${id('delete-btn')}" class="btn-danger">Xóa dataset</button>
                        </div>
                        <div class="hint" style="margin-top:10px;">
                            Quét sẽ dùng cookie phiên hiện tại.${state.sourceKind === 'bookmarks' ? ' Script lấy cả <strong>Đang đọc</strong> và <strong>Yêu thích</strong>, gồm tên/tác giả Việt–Trung.' : ''}
                            Dữ liệu được lưu theo <code>host + viewer + target + nguồn</code>, nên Bookmarks không ghi đè dataset Thư viện.
                        </div>
                        <div id="${id('scan-notice')}" class="hint" style="margin-top:8px;"></div>
                    </section>

                    <details class="card" open>
                        <summary>Thiết Lập Quét</summary>
                        <div class="grid-2" style="margin-top:10px;">
                            <div class="field">
                                <label>Timeout mỗi request (ms)</label>
                                <input id="${id('timeout')}" type="number" min="1000" step="500">
                            </div>
                            <div class="field">
                                <label>Delay giữa 2 request (ms)</label>
                                <input id="${id('delay')}" type="number" min="0" step="100">
                            </div>
                            <div class="field">
                                <label>Số lần retry</label>
                                <input id="${id('retry')}" type="number" min="0" max="10" step="1">
                            </div>
                            <div class="field">
                                <label>Delay retry (ms)</label>
                                <input id="${id('retry-delay')}" type="number" min="0" step="100">
                            </div>
                        </div>
                        <label class="checkbox">
                            <input id="${id('embed-html')}" type="checkbox">
                            <span>Xuất HTML tự nhúng ảnh bìa cùng host để mở file local vẫn xem ảnh dễ. Tắt đi sẽ dùng ảnh gốc như web để xuất nhanh hơn.</span>
                        </label>
                    </details>

                    <section id="${id('progress-card')}" class="card">
                        <h3>Tiến Trình</h3>
                        <div id="${id('progress-body')}" style="margin-top:10px;"></div>
                    </section>

                    <section class="card">
                        <h3>Tổng Quan</h3>
                        <div id="${id('summary')}" style="margin-top:10px;"></div>
                    </section>

                    <section class="card">
                        <h3>Xuất Dữ Liệu</h3>
                        <div class="row-actions" style="margin-top:10px;">
                            <button id="${id('export-json')}" class="btn-alt">JSON</button>
                            <button id="${id('export-txt')}" class="btn-alt">TXT</button>
                            <button id="${id('export-html')}" class="btn">HTML</button>
                        </div>
                        <div class="hint" style="margin-top:10px;">
                            HTML có bộ lọc cục bộ, xem danh sách đẹp hơn JSON/TXT. Bật nhúng bìa thì file nặng hơn nhưng tự chứa hơn; tắt nhúng bìa thì xuất nhanh kiểu web vì trình duyệt sẽ tự tải ảnh gốc.
                        </div>
                    </section>

                    <section class="card">
                        <h3>Xem Trước</h3>
                        <div class="toolbar" style="margin-top:10px;">
                            <div class="field">
                                <label>Tìm kiếm</label>
                                <input id="${id('search-input')}" placeholder="Tên truyện, tác giả, danh sách...">
                            </div>
                            <div class="toolbar-row">
                                <div class="field">
                                    <label>Lọc theo danh sách</label>
                                    <select id="${id('list-filter')}"></select>
                                </div>
                                <div class="field">
                                    <label>Sắp xếp</label>
                                    <select id="${id('sort-filter')}">
                                        <option value="views">Views giảm dần</option>
                                        <option value="likes">Likes giảm dần</option>
                                        <option value="comments">Comments giảm dần</option>
                                        <option value="lists">Số danh sách giảm dần</option>
                                        <option value="title">Tiêu đề A-Z</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="${id('preview-meta')}" class="preview-meta" style="margin-top:10px;"></div>
                        <div id="${id('preview-rows')}" class="preview-rows"></div>
                    </section>

                    <details class="card">
                        <summary>Log</summary>
                        <div id="${id('log-box')}" class="log-box"></div>
                    </details>
                </div>
            </div>

            <div id="${id('guide-root')}"></div>
        `;

        // Vào tab "Thư viện" của bảng chung, kèm lớp CSS phủ để theo bộ màu chung.
        host.style.cssText = 'all:initial;display:block;';
        const skin = document.createElement('style');
        skin.textContent = LIB_SKIN;
        shadow.appendChild(skin);
        hubTab('lib', 'Thư viện', 30, VERSION, 'lib').appendChild(host);

        const floating = shadow.getElementById(id('floating'));
        floating.classList.add('hidden');
        state.panelOpen = hubActive() === 'lib';
        document.addEventListener('aurel-hub:change', (event) => {
            state.panelOpen = event.detail === 'lib';
            renderGuide();
        });
        document.addEventListener('aurel-hub:help', (event) => {
            if (event.detail === 'lib') openGuide('help');
        });
        document.addEventListener('aurel-hub:close', (event) => {
            if (event.detail === 'lib') state.abortScan = true;
        });
        const pill = dockPill(dockSlot('lib', 25), 'lib', 'Thư viện', showPanel, showPanel);
        pill.ic.title = pill.tx.title = `Mở ${sourceKindLabel(state.sourceKind)} — Library & Bookmarks Archiver`;

        // Tiêu đề riêng bị ẩn → đưa nút "Làm mới" xuống hàng nút của thẻ quét.
        const refreshBtn = shadow.getElementById(id('refresh-meta'));
        const loadRow = shadow.getElementById(id('load-btn'))?.parentElement;
        if (refreshBtn && loadRow) {
            refreshBtn.className = 'btn-alt';
            refreshBtn.textContent = 'Làm mới';
            loadRow.insertBefore(refreshBtn, loadRow.firstChild);
        }
        shadow.getElementById(id('export-json'))?.parentElement?.classList.add('tri');
        shadow.getElementById(id('help')).addEventListener('click', () => {
            openGuide('help');
        });
        shadow.getElementById(id('minimize')).addEventListener('click', hidePanel);
        shadow.getElementById(id('refresh-meta')).addEventListener('click', async () => {
            await refreshMetaList({ forcePreferred: true, preferredTargetUser: getTargetUserFromInput() || state.currentPageUser });
            if (state.selectedKey) {
                await loadSelectedDataset(state.selectedKey);
            }
        });
        shadow.getElementById(id('use-page-user')).addEventListener('click', () => {
            const input = shadow.getElementById(id('target-input'));
            input.value = state.currentPageUser || '';
            const preferredKey = preferredDatasetKeyForUser(state.currentPageUser, state.viewerUser || 'anonymous');
            state.selectedKey = preferredKey || '';
            renderDatasetOptions();
            renderUiState();
        });
        shadow.getElementById(id('scan-btn')).addEventListener('click', async () => {
            saveSettingsFromInputs();
            const input = shadow.getElementById(id('target-input'));
            await startScan(input.value);
        });
        shadow.getElementById(id('stop-btn')).addEventListener('click', () => {
            state.abortScan = true;
        });
        shadow.getElementById(id('load-btn')).addEventListener('click', async () => {
            saveSettingsFromInputs();
            await loadSelectedDataset(shadow.getElementById(id('dataset-select')).value);
        });
        shadow.getElementById(id('delete-btn')).addEventListener('click', handleDeleteSelected);
        shadow.getElementById(id('dataset-select')).addEventListener('change', async (event) => {
            state.selectedKey = event.target.value;
            renderUiState();
        });
        shadow.getElementById(id('export-json')).addEventListener('click', exportJson);
        shadow.getElementById(id('export-txt')).addEventListener('click', exportTxt);
        shadow.getElementById(id('export-html')).addEventListener('click', async () => {
            saveSettingsFromInputs();
            await exportHtml();
        });
        shadow.getElementById(id('target-input')).addEventListener('input', () => {
            renderUiState();
        });
        shadow.getElementById(id('target-input')).addEventListener('change', () => {
            const preferredKey = preferredDatasetKeyForUser(getTargetUserFromInput(), state.viewerUser || 'anonymous');
            state.selectedKey = preferredKey || '';
            renderDatasetOptions();
            renderUiState();
        });
        shadow.getElementById(id('search-input')).addEventListener('input', (event) => {
            state.preview.search = event.target.value;
            renderPreview();
        });
        shadow.getElementById(id('list-filter')).addEventListener('change', (event) => {
            state.preview.listId = event.target.value;
            renderPreview();
        });
        shadow.getElementById(id('sort-filter')).addEventListener('change', (event) => {
            state.preview.sortBy = event.target.value;
            renderPreview();
        });
        [
            id('timeout'),
            id('delay'),
            id('retry'),
            id('retry-delay'),
            id('embed-html')
        ].forEach((fieldId) => {
            shadow.getElementById(fieldId).addEventListener('change', saveSettingsFromInputs);
        });
        shadow.getElementById(id('guide-root')).addEventListener('click', (event) => {
            const origin = event.target instanceof Element ? event.target : null;
            const button = origin ? origin.closest('[data-action]') : null;
            if (!button) return;
            const action = button.getAttribute('data-action');
            if (action === 'close-guide') {
                closeGuide();
                return;
            }
            if (action === 'open-panel') {
                showPanel();
                return;
            }
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && state.guideOpen) {
                closeGuide();
            }
        });

        syncInputsFromState();
        renderDatasetOptions();
        renderProgress();
        renderSummary();
        renderPreview();
        renderLogs();
        renderGuide();
        renderScanNotice();
        renderUiState();
    }

    async function bootstrap() {
        state.sourceKind = getSourceKind();
        state.currentPageUser = getCurrentPageUser();
        const viewer = getViewerIdentity();
        state.viewerUser = viewer.slug || 'anonymous';
        state.viewerDisplayName = viewer.displayName || '';

        createUi();
        syncInputsFromState();
        if (state.shadow) {
            const targetInput = state.shadow.getElementById(id('target-input'));
            if (targetInput && state.currentPageUser) {
                targetInput.value = state.currentPageUser;
            }
        }

        await refreshMetaList({ forcePreferred: true });
        if (state.selectedKey) {
            await loadSelectedDataset(state.selectedKey);
        }

        if (typeof GM_registerMenuCommand === 'function') {
            GM_registerMenuCommand('Mở Library & Bookmarks Archiver', () => {
                showPanel();
            });
            GM_registerMenuCommand('Mở hướng dẫn Archiver', () => {
                openGuide('help');
            });
            GM_registerMenuCommand(`Quét ${sourceKindLabel(state.sourceKind)} user hiện tại`, async () => {
                showPanel();
                if (state.shadow) {
                    const input = state.shadow.getElementById(id('target-input'));
                    if (input && state.currentPageUser) {
                        input.value = state.currentPageUser;
                    }
                    await startScan(input?.value || state.currentPageUser || '');
                }
            });
        }

        runVersionCheck();
    }

    bootstrap().catch((error) => {
        console.error('[LibraryArchiver] init', error);
    });
})();
