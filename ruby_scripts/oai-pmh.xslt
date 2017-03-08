<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="object">
<?xml-model
href="http://schemas.seadatanet.org/Standards-Software/Metadata-formats/SDN2_CSR_ISO19139_3.0.0.sch" type="application/xml" schematypens="http://purl.oclc.org/dsdl/schematron"
?>
<gmi:MI_Metadata xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gmi="http://www.isotc211.org/2005/gmi" xmlns:srv="http://www.isotc211.org/2005/srv" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:gts="http://www.isotc211.org/2005/gts" xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sdn="http://www.seadatanet.org" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.seadatanet.org http://schemas.seadatanet.org/Standards-Software/Metadata-formats/SDN2_CSR_ISO19139_3.0.0.xsd">
<gmd:fileIdentifier>
<gco:CharacterString>urn:SDN:CSR:LOCAL:<xsl:value-of select="id"/></gco:CharacterString>
</gmd:fileIdentifier>
<gmd:language>
<gmd:LanguageCode codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#LanguageCode" codeListValue="eng" codeSpace="ISOTC211/19115">English</gmd:LanguageCode>
</gmd:language>
<gmd:characterSet>
<gmd:MD_CharacterSetCode codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_CharacterSetCode" codeListValue="utf8" codeSpace="ISOTC211/19115">utf8</gmd:MD_CharacterSetCode>
</gmd:characterSet>
<gmd:hierarchyLevel>
<gmd:MD_ScopeCode codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_ScopeCode" codeListValue="series" codeSpace="ISOTC211/19115">series</gmd:MD_ScopeCode>
</gmd:hierarchyLevel>
<gmd:hierarchyLevelName>
<sdn:SDN_HierarchyLevelNameCode codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/cdicsrCodeList.xml#SDN_HierarchyLevelNameCode" codeListValue="CSR" codeSpace="SeaDataNet">Cruise Summary record</sdn:SDN_HierarchyLevelNameCode>
</gmd:hierarchyLevelName>
<gmd:contact>
<gmd:CI_ResponsibleParty>
<gmd:organisationName>
<sdn:SDN_EDMOCode codeSpace="SeaDataNet" codeListValue="1349" codeList="http://seadatanet.maris2.nl/isocodelists/sdncodelists/edmo-edmerp-Codelists.xml#SDN_EDMOCode">Norwegian Polar Institute</sdn:SDN_EDMOCode>
</gmd:organisationName>
<gmd:contactInfo>
<gmd:CI_Contact>
<gmd:phone>
<gmd:CI_Telephone>
<gmd:voice>
<gco:CharacterString>+47 77 75 05 00</gco:CharacterString>
</gmd:voice>
<gmd:facsimile>
<gco:CharacterString>+47 77 75 05 01</gco:CharacterString>
</gmd:facsimile>
</gmd:CI_Telephone>
</gmd:phone>
<gmd:address>
<gmd:CI_Address>
<gmd:deliveryPoint>
<gco:CharacterString>Framsenteret Pb 6606 Langnes</gco:CharacterString>
</gmd:deliveryPoint>
<gmd:city>
<gco:CharacterString>TROMSO</gco:CharacterString>
</gmd:city>
<gmd:postalCode>
<gco:CharacterString>9296</gco:CharacterString>
</gmd:postalCode>
<gmd:country>
<sdn:SDN_CountryCode codeSpace="SeaDataNet" codeListValue="NO" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/cdicsrCodeList.xml#SDN_CountryCode">Norway</sdn:SDN_CountryCode>
</gmd:country>
<gmd:electronicMailAddress>
<gco:CharacterString>data@npolar.no</gco:CharacterString>
</gmd:electronicMailAddress>
</gmd:CI_Address>
</gmd:address>
<gmd:onlineResource>
<gmd:CI_OnlineResource>
<gmd:linkage>
<gmd:URL>http://data.npolar.no</gmd:URL>
</gmd:linkage>
</gmd:CI_OnlineResource>
</gmd:onlineResource>
</gmd:CI_Contact>
</gmd:contactInfo>
<gmd:role>
<gmd:CI_RoleCode codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_RoleCode" codeListValue="pointOfContact" codeSpace="ISOTC211/19115">pointOfContact</gmd:CI_RoleCode>
</gmd:role>
</gmd:CI_ResponsibleParty>
</gmd:contact>
<gmd:dateStamp>
<gco:Date><xsl:value-of select="created"/></gco:Date>
</gmd:dateStamp>
<gmd:metadataStandardName>
<gco:CharacterString>ISO 19115/SeaDataNet profile</gco:CharacterString>
</gmd:metadataStandardName>
<gmd:metadataStandardVersion>
<gco:CharacterString>1.0</gco:CharacterString>
</gmd:metadataStandardVersion>
<gmd:metadataExtensionInfo xlink:href="http://schemas.seadatanet.org/Standards-Software/Metadata-formats/csrExtensionInformation.xml"/>
<gmd:identificationInfo>
<sdn:SDN_DataIdentification gco:isoType="MD_DataIdentification_Type">
<gmd:citation>
<gmd:CI_Citation>
<gmd:title>
<gco:CharacterString><xsl:value-of select="code"/></gco:CharacterString>
</gmd:title>
<gmd:alternateTitle>
<gco:CharacterString><xsl:value-of select="id"/></gco:CharacterString>
</gmd:alternateTitle>
<gmd:date>
<gmd:CI_Date>
<gmd:date>
<gco:Date><xsl:value-of select="created"/></gco:Date>
</gmd:date>
<gmd:dateType>
<gmd:CI_DateTypeCode codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_DateTypeCode" codeListValue="revision" codeSpace="ISOTC211/19115">revision</gmd:CI_DateTypeCode>
</gmd:dateType>
</gmd:CI_Date>
</gmd:date>
<gmd:identifier>
<gmd:MD_Identifier>
<gmd:code>
<gco:CharacterString>urn:SDN:CSR:LOCAL:<xsl:value-of select="id"/></gco:CharacterString>
</gmd:code>
</gmd:MD_Identifier>
</gmd:identifier>
<gmd:citedResponsibleParty>
<gmd:CI_ResponsibleParty>
<gmd:organisationName>
<sdn:SDN_EDMOCode codeList="http://seadatanet.maris2.nl/isocodelists/sdncodelists/edmo-edmerp-Codelists.xml#SDN_EDMOCode" codeSpace="SeaDataNet" codeListValue="1349">Norwegian Polar Institute
</sdn:SDN_EDMOCode>
</gmd:organisationName>
<gmd:contactInfo>
<gmd:CI_Contact>
<gmd:phone>
<gmd:CI_Telephone>
<gmd:voice>
<gco:CharacterString>+47 77 75 05 00</gco:CharacterString>
</gmd:voice>
<gmd:facsimile>
<gco:CharacterString>+47 77 75 05 01</gco:CharacterString>
</gmd:facsimile>
</gmd:CI_Telephone>
</gmd:phone>
<gmd:address>
<gmd:CI_Address>
<gmd:deliveryPoint>
<gco:CharacterString>Framsenteret Postboks 6606 Langnes</gco:CharacterString>
</gmd:deliveryPoint>
<gmd:city>
<gco:CharacterString>Tromso</gco:CharacterString>
</gmd:city>
<gmd:postalCode>
<gco:CharacterString>9296</gco:CharacterString>
</gmd:postalCode>
<gmd:country>
<sdn:SDN_CountryCode codeSpace="SeaDataNet" codeListValue="NO" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/cdicsrCodeList.xml#SDN_CountryCode">Norway</sdn:SDN_CountryCode>
</gmd:country>
<gmd:electronicMailAddress>
<gco:CharacterString>data@npolar.no</gco:CharacterString>
</gmd:electronicMailAddress>
</gmd:CI_Address>
</gmd:address>
<gmd:onlineResource>
<gmd:CI_OnlineResource>
<gmd:linkage>
<gmd:URL>http://www.npolar.no</gmd:URL>
</gmd:linkage>
</gmd:CI_OnlineResource>
</gmd:onlineResource>
</gmd:CI_Contact>
</gmd:contactInfo>
<gmd:role>
<gmd:CI_RoleCode codeSpace="ISOTC211/19115" codeListValue="originator" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_RoleCode">originator</gmd:CI_RoleCode>
</gmd:role>
</gmd:CI_ResponsibleParty>
</gmd:citedResponsibleParty>
</gmd:CI_Citation>
</gmd:citation>
<gmd:abstract>
<gco:CharacterString><xsl:value-of select="summary"/></gco:CharacterString>
</gmd:abstract>

<xsl:for-each select="people">
<gmd:pointOfContact>
<gmd:CI_ResponsibleParty>
<gmd:individualName>
<gco:CharacterString><xsl:value-of select='first_name'/><xsl:value-of select='last_name'/></gco:CharacterString>
</gmd:individualName>
<gmd:organisationName>
<sdn:SDN_EDMOCode codeSpace="SeaDataNet" codeListValue="1349" codeList="http://seadatanet.maris2.nl/isocodelists/sdncodelists/edmo-edmerp-Codelists.xml#SDN_EDMOCode">Norwegian Polar Institute</sdn:SDN_EDMOCode>
</gmd:organisationName>
<gmd:role>
<gmd:CI_RoleCode codeSpace="ISOTC211/19115" codeListValue="pointOfContact" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_RoleCode">pointOfContact</gmd:CI_RoleCode>
</gmd:role>
</gmd:CI_ResponsibleParty>
</gmd:pointOfContact>
</xsl:for-each>


<gmd:descriptiveKeywords>
<gmd:MD_Keywords>
<gmd:keyword>
<gco:CharacterString>Oceanographic geographical features</gco:CharacterString>
</gmd:keyword>
<gmd:type>
<gmd:MD_KeywordTypeCode codeSpace="SeaDataNet" codeListValue="theme" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_KeywordTypeCode">theme</gmd:MD_KeywordTypeCode>
</gmd:type>
<gmd:thesaurusName>
<gmd:CI_Citation>
<gmd:title>
<gco:CharacterString>GEMET - INSPIRE themes, version 1.0</gco:CharacterString>
</gmd:title>
<gmd:date>
<gmd:CI_Date>
<gmd:date>
<gco:Date>2008-06-01</gco:Date>
</gmd:date>
<gmd:dateType>
<gmd:CI_DateTypeCode codeSpace="ISOTC211/19115" codeListValue="publication" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_DateTypeCode">publication</gmd:CI_DateTypeCode>
</gmd:dateType>
</gmd:CI_Date>
</gmd:date>
</gmd:CI_Citation>
</gmd:thesaurusName>
</gmd:MD_Keywords>
</gmd:descriptiveKeywords>
<gmd:descriptiveKeywords>
<gmd:MD_Keywords>
<gmd:keyword>
<sdn:SDN_PortCode codeSpace="SeaDataNet" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/cdicsrCodeList.xml#SDN_PortCode">
<xsl:attribute name="codeListValue">
    <xsl:value-of select="departure_placename_id" />
  </xsl:attribute>
<xsl:value-of select="departure_placename"/></sdn:SDN_PortCode>
</gmd:keyword>
<gmd:type>
<gmd:MD_KeywordTypeCode codeSpace="SeaDataNet" codeListValue="departure_place" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_KeywordTypeCode">departure_place</gmd:MD_KeywordTypeCode>
</gmd:type>
<gmd:thesaurusName>
<gmd:CI_Citation>
<gmd:title>
<gco:CharacterString>SeaDataNet Ports Gazetteer</gco:CharacterString>
</gmd:title>
<gmd:alternateTitle>
<gco:CharacterString>C38</gco:CharacterString>
</gmd:alternateTitle>
<gmd:date>
<gmd:CI_Date>
<gmd:date>
<gco:Date><xsl:value-of select="start_date_short"/></gco:Date>
</gmd:date>
<gmd:dateType>
<gmd:CI_DateTypeCode codeSpace="ISOTC211/19115" codeListValue="revision" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_DateTypeCode">revision</gmd:CI_DateTypeCode>
</gmd:dateType>
</gmd:CI_Date>
</gmd:date>
<gmd:edition>
<gco:CharacterString>38</gco:CharacterString>
</gmd:edition>
<gmd:identifier>
<gmd:MD_Identifier>
<gmd:code>
<gco:CharacterString>http://www.seadatanet.org/urnurl/SDN:C38</gco:CharacterString>
</gmd:code>
</gmd:MD_Identifier>
</gmd:identifier>
</gmd:CI_Citation>
</gmd:thesaurusName>
</gmd:MD_Keywords>
</gmd:descriptiveKeywords>
<gmd:descriptiveKeywords>
<gmd:MD_Keywords>
<gmd:keyword><sdn:SDN_PortCode codeSpace="SeaDataNet" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/cdicsrCodeList.xml#SDN_PortCode">
<xsl:attribute name="codeListValue">
    <xsl:value-of select="return_placename_id" />
  </xsl:attribute>
	<xsl:value-of select="return_placename"/></sdn:SDN_PortCode>
</gmd:keyword>
<gmd:type>
<gmd:MD_KeywordTypeCode codeSpace="SeaDataNet" codeListValue="arrival_place" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_KeywordTypeCode">arrival_place</gmd:MD_KeywordTypeCode>
</gmd:type>
<gmd:thesaurusName>
<gmd:CI_Citation>
<gmd:title>
<gco:CharacterString>SeaDataNet Ports Gazetteer</gco:CharacterString>
</gmd:title>
<gmd:alternateTitle>
<gco:CharacterString>C38</gco:CharacterString>
</gmd:alternateTitle>
<gmd:date>
<gmd:CI_Date>
<gmd:date>
<gco:Date><xsl:value-of select="end_date_short"</gco:Date>
</gmd:date>
<gmd:dateType>
<gmd:CI_DateTypeCode codeSpace="ISOTC211/19115" codeListValue="revision" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_DateTypeCode">revision</gmd:CI_DateTypeCode>
</gmd:dateType>
</gmd:CI_Date>
</gmd:date>
<gmd:edition>
<gco:CharacterString>38</gco:CharacterString>
</gmd:edition>
<gmd:identifier>
<gmd:MD_Identifier>
<gmd:code>
<gco:CharacterString>http://www.seadatanet.org/urnurl/SDN:C38</gco:CharacterString>
</gmd:code>
</gmd:MD_Identifier>
</gmd:identifier>
</gmd:CI_Citation>
</gmd:thesaurusName>
</gmd:MD_Keywords>
</gmd:descriptiveKeywords>

<gmd:descriptiveKeywords>
<gmd:MD_Keywords>
<gmd:keyword>
<sdn:SDN_CountryCode codeSpace="SeaDataNet" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/cdicsrCodeList.xml#SDN_CountryCode">
	<xsl:attribute name="codeListValue">
    <xsl:value-of select="departure_country_id" />
    </xsl:attribute>
<xsl:value-of select="departure_country"/>
	</sdn:SDN_CountryCode>
</gmd:keyword>
<gmd:type>
<gmd:MD_KeywordTypeCode codeSpace="SeaDataNet" codeListValue="departure_country" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_KeywordTypeCode">departure_country</gmd:MD_KeywordTypeCode>
</gmd:type>
<gmd:thesaurusName>
<gmd:CI_Citation>
<gmd:title>
<gco:CharacterString>International Standards Organisation countries</gco:CharacterString>
</gmd:title>
<gmd:alternateTitle>
<gco:CharacterString>C32</gco:CharacterString>
</gmd:alternateTitle>
<gmd:date>
<gmd:CI_Date>
<gmd:date>
<gco:Date>2011-12-15</gco:Date>
</gmd:date>
<gmd:dateType>
<gmd:CI_DateTypeCode codeSpace="ISOTC211/19115" codeListValue="revision" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_DateTypeCode">revision</gmd:CI_DateTypeCode>
</gmd:dateType>
</gmd:CI_Date>
</gmd:date>
<gmd:edition>
<gco:CharacterString>6</gco:CharacterString>
</gmd:edition>
<gmd:identifier>
<gmd:MD_Identifier>
<gmd:code>
<gco:CharacterString>http://www.seadatanet.org/urnurl/SDN:C32</gco:CharacterString>
</gmd:code>
</gmd:MD_Identifier>
</gmd:identifier>
</gmd:CI_Citation>
</gmd:thesaurusName>
</gmd:MD_Keywords>
</gmd:descriptiveKeywords>
<gmd:descriptiveKeywords>
<gmd:MD_Keywords>
<gmd:keyword>
	<sdn:SDN_CountryCode codeSpace="SeaDataNet" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/cdicsrCodeList.xml#SDN_CountryCode">
		<xsl:attribute name="codeListValue">
    <xsl:value-of select="return_country_id" />
  </xsl:attribute>
 <xsl:value-of select="return_country"/></sdn:SDN_CountryCode>
</gmd:keyword>
<gmd:type>
<gmd:MD_KeywordTypeCode codeSpace="SeaDataNet" codeListValue="arrival_country" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_KeywordTypeCode">arrival_country</gmd:MD_KeywordTypeCode>
</gmd:type>
<gmd:thesaurusName>
<gmd:CI_Citation>
<gmd:title>
<gco:CharacterString>International Standards Organisation countries</gco:CharacterString>
</gmd:title>
<gmd:alternateTitle>
<gco:CharacterString>C32</gco:CharacterString>
</gmd:alternateTitle>
<gmd:date>
<gmd:CI_Date>
<gmd:date>
<gco:Date>2011-12-15</gco:Date>
</gmd:date>
<gmd:dateType>
<gmd:CI_DateTypeCode codeSpace="ISOTC211/19115" codeListValue="revision" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_DateTypeCode">revision</gmd:CI_DateTypeCode>
</gmd:dateType>
</gmd:CI_Date>
</gmd:date>
<gmd:edition>
<gco:CharacterString>6</gco:CharacterString>
</gmd:edition>
<gmd:identifier>
<gmd:MD_Identifier>
<gmd:code>
<gco:CharacterString>http://www.seadatanet.org/urnurl/SDN:C32</gco:CharacterString>
</gmd:code>
</gmd:MD_Identifier>
</gmd:identifier>
</gmd:CI_Citation>
</gmd:thesaurusName>
</gmd:MD_Keywords>
</gmd:descriptiveKeywords>
<gmd:descriptiveKeywords>
<gmd:MD_Keywords>
<gmd:keyword>
	<sdn:SDN_PlatformCode codeSpace="SeaDataNet" codeListValue="3230" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/cdicsrCodeList.xml#SDN_PlatformCode">
		<xsl:attribute name="codeListValue">
    <xsl:value-of select="ship_id" />
  </xsl:attribute>
		<xsl:value-of select="ship"/></sdn:SDN_PlatformCode>
</gmd:keyword>
<gmd:type>
<gmd:MD_KeywordTypeCode codeSpace="SeaDataNet" codeListValue="platform" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_KeywordTypeCode">platform</gmd:MD_KeywordTypeCode>
</gmd:type>
<gmd:thesaurusName>
<gmd:CI_Citation>
<gmd:title>
<gco:CharacterString>ICES Platform Codes</gco:CharacterString>
</gmd:title>
<gmd:alternateTitle>
<gco:CharacterString>C17</gco:CharacterString>
</gmd:alternateTitle>
<gmd:date>
<gmd:CI_Date>
<gmd:date>
<gco:Date>2013-10-04</gco:Date>
</gmd:date>
<gmd:dateType>
<gmd:CI_DateTypeCode codeSpace="ISOTC211/19115" codeListValue="revision" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_DateTypeCode">revision</gmd:CI_DateTypeCode>
</gmd:dateType>
</gmd:CI_Date>
</gmd:date>
<gmd:edition>
<gco:CharacterString>321</gco:CharacterString>
</gmd:edition>
<gmd:identifier>
<gmd:MD_Identifier>
<gmd:code>
<gco:CharacterString>http://www.seadatanet.org/urnurl/SDN:C17</gco:CharacterString>
</gmd:code>
</gmd:MD_Identifier>
</gmd:identifier>
</gmd:CI_Citation>
</gmd:thesaurusName>
</gmd:MD_Keywords>
</gmd:descriptiveKeywords>
<gmd:descriptiveKeywords>
<gmd:MD_Keywords>
<gmd:keyword>
<sdn:SDN_PlatformCategoryCode codeSpace="SeaDataNet" codeListValue="31" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/cdicsrCodeList.xml#SDN_PlatformCategoryCode">research vessel</sdn:SDN_PlatformCategoryCode>
</gmd:keyword>
<gmd:type>
<gmd:MD_KeywordTypeCode codeSpace="SeaDataNet" codeListValue="platform_class" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_KeywordTypeCode">platform_class</gmd:MD_KeywordTypeCode>
</gmd:type>
<gmd:thesaurusName>
<gmd:CI_Citation>
<gmd:title>
<gco:CharacterString>SeaVoX Platform Categories</gco:CharacterString>
</gmd:title>
<gmd:alternateTitle>
<gco:CharacterString>L06</gco:CharacterString>
</gmd:alternateTitle>
<gmd:date>
<gmd:CI_Date>
<gmd:date>
<gco:Date>2013-08-21</gco:Date>
</gmd:date>
<gmd:dateType>
<gmd:CI_DateTypeCode codeSpace="ISOTC211/19115" codeListValue="revision" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_DateTypeCode">revision</gmd:CI_DateTypeCode>
</gmd:dateType>
</gmd:CI_Date>
</gmd:date>
<gmd:edition>
<gco:CharacterString>10</gco:CharacterString>
</gmd:edition>
<gmd:identifier>
<gmd:MD_Identifier>
<gmd:code>
<gco:CharacterString>http://www.seadatanet.org/urnurl/SDN:L06</gco:CharacterString>
</gmd:code>
</gmd:MD_Identifier>
</gmd:identifier>
</gmd:CI_Citation>
</gmd:thesaurusName>
<gmd:type>
<gmd:MD_KeywordTypeCode codeSpace="SeaDataNet" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_KeywordTypeCode" codeListValue="place">place</gmd:MD_KeywordTypeCode>
</gmd:type>
<gmd:thesaurusName>
<gmd:CI_Citation>
<gmd:title>
<gco:CharacterString>SeaVoX salt and fresh water body gazetteer</gco:CharacterString>
</gmd:title>
<gmd:alternateTitle>
<gco:CharacterString>C19</gco:CharacterString>
</gmd:alternateTitle>
<gmd:date>
<gmd:CI_Date>
<gmd:date>
<gco:Date>2013-04-23</gco:Date>
</gmd:date>
<gmd:dateType>
<gmd:CI_DateTypeCode codeSpace="ISOTC211/19115" codeListValue="revision" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_DateTypeCode">revision</gmd:CI_DateTypeCode>
</gmd:dateType>
</gmd:CI_Date>
</gmd:date>
<gmd:edition>
<gco:CharacterString>14</gco:CharacterString>
</gmd:edition>
<gmd:identifier>
<gmd:MD_Identifier>
<gmd:code>
<gco:CharacterString>http://www.seadatanet.org/urnurl/SDN:C19</gco:CharacterString>
</gmd:code>
</gmd:MD_Identifier>
</gmd:identifier>
</gmd:CI_Citation>
</gmd:thesaurusName>
</gmd:MD_Keywords>
</gmd:descriptiveKeywords>
<gmd:resourceConstraints>
<gmd:MD_Constraints>
<gmd:useLimitation>
<gco:CharacterString>Not applicable</gco:CharacterString>
</gmd:useLimitation>
</gmd:MD_Constraints>
</gmd:resourceConstraints>
<gmd:resourceConstraints>
<gmd:MD_LegalConstraints>
<gmd:accessConstraints>
<gmd:MD_RestrictionCode codeListValue="otherRestrictions" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_RestrictionCode">otherRestrictions</gmd:MD_RestrictionCode>
</gmd:accessConstraints>
<gmd:otherConstraints>
<gmx:Anchor xlink:href="http://www.seadatanet.org/urnurl/SDN:L08::RS"><xsl:value-of select="availability"/></gmx:Anchor>
</gmd:otherConstraints>
</gmd:MD_LegalConstraints>
</gmd:resourceConstraints>
<gmd:resourceConstraints>
<gmd:MD_LegalConstraints>
<gmd:accessConstraints>
<gmd:MD_RestrictionCode codeListValue="otherRestrictions" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_RestrictionCode">otherRestrictions</gmd:MD_RestrictionCode>
</gmd:accessConstraints>
<gmd:otherConstraints>
<gmx:Anchor xlink:href="http://www.seadatanet.org/urnurl/SDN:L08::LS">SeaDataNet licence</gmx:Anchor>
</gmd:otherConstraints>
</gmd:MD_LegalConstraints>
</gmd:resourceConstraints>

<gmd:language>
<gmd:LanguageCode codeSpace="ISOTC211/19115" codeListValue="eng" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#LanguageCode">English</gmd:LanguageCode>
</gmd:language>
<gmd:characterSet>
<gmd:MD_CharacterSetCode codeSpace="ISOTC211/19115" codeListValue="utf8" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_CharacterSetCode">utf8</gmd:MD_CharacterSetCode>
</gmd:characterSet>
<gmd:topicCategory>
<gmd:MD_TopicCategoryCode>oceans</gmd:MD_TopicCategoryCode>
</gmd:topicCategory>

<gmd:extent>
<gmd:EX_Extent>

 <xsl:for-each select="locations/location[west]">
<gmd:geographicElement>
<gmd:EX_GeographicBoundingBox>
<gmd:westBoundLongitude>
<gco:Decimal><xsl:value-of select='west'/></gco:Decimal>
</gmd:westBoundLongitude>
<gmd:eastBoundLongitude>
<gco:Decimal><xsl:value-of select='east'/></gco:Decimal>
</gmd:eastBoundLongitude>
<gmd:southBoundLatitude>
<gco:Decimal><xsl:value-of select='south'/></gco:Decimal>
</gmd:southBoundLatitude>
<gmd:northBoundLatitude>
<gco:Decimal><xsl:value-of select='north'/></gco:Decimal>
</gmd:northBoundLatitude>
</gmd:EX_GeographicBoundingBox>
</gmd:geographicElement>

</xsl:for-each>
<gmd:temporalElement>
<gmd:EX_TemporalExtent>
<gmd:extent>
<gml:TimePeriod gml:id="mik3.3">
<gml:beginPosition><xsl:value-of select="start_date"/></gml:beginPosition>
<gml:endPosition><xsl:value-of select="end_date"/></gml:endPosition>
</gml:TimePeriod>
</gmd:extent>
</gmd:EX_TemporalExtent>
</gmd:temporalElement>
</gmd:EX_Extent>
</gmd:extent>

<sdn:additionalDocumentation xlink:href="http://seadatanet.maris2.nl/isocodelists/sdncodelists/publications-Codelists.xml#SDN_PUBCode_151"/>
</sdn:SDN_DataIdentification>
</gmd:identificationInfo>

<gmd:dataQualityInfo>
<gmd:DQ_DataQuality>
<gmd:scope>
<gmd:DQ_Scope>
<gmd:level>
<gmd:MD_ScopeCode codeSpace="ISOTC211/19115" codeListValue="series" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_ScopeCode">series</gmd:MD_ScopeCode>
</gmd:level>
</gmd:DQ_Scope>
</gmd:scope>
<gmd:report>
<gmd:DQ_DomainConsistency>
<gmd:result>
<gmd:DQ_ConformanceResult>
<gmd:specification>
<gmd:CI_Citation>
<gmd:title>
<gco:CharacterString>COMMISSION REGULATION (EC) No 1205/2008 of 3 December 2008 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards metadata</gco:CharacterString>
</gmd:title>
<gmd:date>
<gmd:CI_Date>
<gmd:date>
<gco:Date>2008-12-04</gco:Date>
</gmd:date>
<gmd:dateType>
<gmd:CI_DateTypeCode codeSpace="ISOTC211/19115" codeListValue="publication" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_DateTypeCode">publication</gmd:CI_DateTypeCode>
</gmd:dateType>
</gmd:CI_Date>
</gmd:date>
</gmd:CI_Citation>
</gmd:specification>
<gmd:explanation>
<gco:CharacterString>See the referenced specification</gco:CharacterString>
</gmd:explanation>
<gmd:pass>
<gco:Boolean>true</gco:Boolean>
</gmd:pass>
</gmd:DQ_ConformanceResult>
</gmd:result>
</gmd:DQ_DomainConsistency>
</gmd:report>
<gmd:lineage>
<gmd:LI_Lineage>
<gmd:statement>
<gco:CharacterString>The data centres apply standard data quality control procedures on all data that the centres manage. Ask the data centre for details.</gco:CharacterString>
</gmd:statement>
</gmd:LI_Lineage>
</gmd:lineage>
</gmd:DQ_DataQuality>
</gmd:dataQualityInfo>

<gmi:acquisitionInformation>
<gmi:MI_AcquisitionInformation>
<gmi:operation>
<gmi:MI_Operation><xsl:attribute name="id">
    <xsl:value-of select="full_id" />
  </xsl:attribute>
<gmi:description>
<gco:CharacterString><xsl:value-of select="summary"/></gco:CharacterString>
</gmi:description>
<gmi:citation>
<gmd:CI_Citation>
<gmd:title>
<gco:CharacterString><xsl:value-of select="code"/></gco:CharacterString>
</gmd:title>
<gmd:alternateTitle>
<gco:CharacterString><xsl:value-of select="id"/></gco:CharacterString>
</gmd:alternateTitle>
<gmd:date>
<gmd:CI_Date>
<gmd:date>
<gco:Date><xsl:value-of select="updated"/></gco:Date>
</gmd:date>
<gmd:dateType>
<gmd:CI_DateTypeCode codeSpace="ISOTC211/19115" codeListValue="revision" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#CI_DateTypeCode">revision</gmd:CI_DateTypeCode>
</gmd:dateType>
</gmd:CI_Date>
</gmd:date>
</gmd:CI_Citation>
</gmi:citation>
<gmi:status>
<gmd:MD_ProgressCode codeListValue="completed" codeList="http://vocab.nerc.ac.uk/isoCodelists/sdnCodelists/gmxCodeLists.xml#MD_ProgressCode">completed</gmd:MD_ProgressCode>
</gmi:status>
<gmi:significantEvent>
<gmi:MI_Event>
<gmi:identifier>
<gmd:MD_Identifier>
<gmd:code>
<gco:CharacterString>cruise-start</gco:CharacterString>
</gmd:code>
</gmd:MD_Identifier>
</gmi:identifier>
<gmi:trigger>
<gmi:MI_TriggerCode codeListValue="manual" codeList="http://www.isotc211.org/2005/resources/Codelist/gmiCodelists.xml#MI_TriggerCode">manual</gmi:MI_TriggerCode>
</gmi:trigger>
<gmi:context>
<gmi:MI_ContextCode codeListValue="wayPoint" codeList="http://www.isotc211.org/2005/resources/Codelist/gmiCodelists.xml#MI_ContextCode">wayPoint</gmi:MI_ContextCode>
</gmi:context>
<gmi:sequence>
<gmi:MI_SequenceCode codeListValue="start" codeList="http://www.isotc211.org/2005/resources/Codelist/gmiCodelists.xml#MI_SequenceCode">start</gmi:MI_SequenceCode>
</gmi:sequence>
<gmi:time>
<gco:DateTime><xsl:value-of select="start_date"/></gco:DateTime>
</gmi:time>
</gmi:MI_Event>
</gmi:significantEvent>
<gmi:significantEvent>
<gmi:MI_Event>
<gmi:identifier>
<gmd:MD_Identifier>
<gmd:code>
<gco:CharacterString>cruise-end</gco:CharacterString>
</gmd:code>
</gmd:MD_Identifier>
</gmi:identifier>
<gmi:trigger>
<gmi:MI_TriggerCode codeListValue="manual" codeList="http://www.isotc211.org/2005/resources/Codelist/gmiCodelists.xml#MI_TriggerCode">manual</gmi:MI_TriggerCode>
</gmi:trigger>
<gmi:context>
<gmi:MI_ContextCode codeListValue="wayPoint" codeList="http://www.isotc211.org/2005/resources/Codelist/gmiCodelists.xml#MI_ContextCode">wayPoint</gmi:MI_ContextCode>
</gmi:context>
<gmi:sequence>
<gmi:MI_SequenceCode codeListValue="end" codeList="http://www.isotc211.org/2005/resources/Codelist/gmiCodelists.xml#MI_SequenceCode">end</gmi:MI_SequenceCode>
</gmi:sequence>
<gmi:time>
<gco:DateTime><xsl:value-of select="end_date"/></gco:DateTime>
</gmi:time>
</gmi:MI_Event>
</gmi:significantEvent>
</gmi:MI_Operation>
</gmi:operation>
</gmi:MI_AcquisitionInformation>
</gmi:acquisitionInformation>
    </gmi:MI_Metadata>
</xsl:template>
</xsl:stylesheet>